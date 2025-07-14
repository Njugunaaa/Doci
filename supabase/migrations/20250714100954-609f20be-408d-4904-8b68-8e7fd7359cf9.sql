
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('patient', 'doctor')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table for additional doctor-specific info
CREATE TABLE public.doctors (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  specialization TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  bio TEXT,
  years_experience INTEGER,
  consultation_fee DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create communities table
CREATE TABLE public.communities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community members table
CREATE TABLE public.community_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for doctors
CREATE POLICY "Anyone can view verified doctors" ON public.doctors FOR SELECT USING (is_verified = true);
CREATE POLICY "Doctors can update own profile" ON public.doctors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Doctors can insert own profile" ON public.doctors FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for communities
CREATE POLICY "Users can view public communities" ON public.communities FOR SELECT USING (is_private = false OR id IN (SELECT community_id FROM public.community_members WHERE user_id = auth.uid()));
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Community creators can update their communities" ON public.communities FOR UPDATE USING (created_by = auth.uid());

-- RLS Policies for community members
CREATE POLICY "Users can view community members" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Users can join communities" ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for community posts
CREATE POLICY "Users can view posts in their communities" ON public.community_posts FOR SELECT USING (
  community_id IN (SELECT community_id FROM public.community_members WHERE user_id = auth.uid())
  OR community_id IN (SELECT id FROM public.communities WHERE is_private = false)
);
CREATE POLICY "Community members can create posts" ON public.community_posts FOR INSERT WITH CHECK (
  auth.uid() = author_id AND 
  community_id IN (SELECT community_id FROM public.community_members WHERE user_id = auth.uid())
);
CREATE POLICY "Post authors can update their posts" ON public.community_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Post authors can delete their posts" ON public.community_posts FOR DELETE USING (auth.uid() = author_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', NEW.raw_user_meta_data->>'userType', 'patient')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample communities
INSERT INTO public.communities (name, description, category, is_private) VALUES
('Heart Health Support', 'A community for people managing heart conditions and cardiovascular health', 'Cardiology', false),
('Diabetes Management', 'Share tips, recipes, and support for diabetes management', 'Endocrinology', false),
('Mental Health & Wellness', 'A safe space to discuss mental health, anxiety, depression, and wellness strategies', 'Psychology', false),
('Pregnancy & New Parents', 'Support and advice for expecting parents and new families', 'Obstetrics', false),
('Chronic Pain Support', 'Understanding and managing chronic pain conditions together', 'Pain Management', false),
('Fitness & Nutrition', 'Healthy lifestyle tips, workout routines, and nutrition advice', 'General Health', false);

-- Insert sample doctors (these will need real user accounts to be created first)
-- This is just the structure - real doctors will sign up through the app
