/*
  # Create user profiles trigger and function

  1. New Functions
    - `handle_new_user()` - Automatically creates a profile when a user signs up
    
  2. Triggers
    - Trigger on auth.users insert to create profile automatically
    
  3. Security
    - Ensures every authenticated user has a profile
    - Maintains data consistency between auth.users and profiles table
*/

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', NEW.raw_user_meta_data->>'userType', 'patient'),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing users without profiles (if any)
INSERT INTO public.profiles (id, email, full_name, user_type, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'fullName', ''),
  COALESCE(au.raw_user_meta_data->>'user_type', au.raw_user_meta_data->>'userType', 'patient'),
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;