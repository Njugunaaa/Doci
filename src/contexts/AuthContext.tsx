import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: AuthError | null; data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null; data: any }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      
      console.log('Signing up with data:', { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || userData?.fullName || '',
            user_type: userData?.user_type || userData?.userType || 'patient',
            ...userData
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { error, data: null };
      }

      console.log('Signup successful:', data);
      
      // Wait a moment for the trigger to create the profile
      if (data.user) {
        setTimeout(async () => {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (profileError) {
              console.error('Profile creation error:', profileError);
            } else {
              console.log('Profile created successfully:', profile);
            }
          } catch (err) {
            console.error('Error checking profile:', err);
          }
        }, 2000);
      }
      
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return { 
        error: { 
          message: 'An unexpected error occurred during signup',
          name: 'UnexpectedError',
          status: 500
        } as AuthError, 
        data: null 
      };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Signin error:', error);
        toast.error(error.message);
        return { error, data: null };
      }

      console.log('Signin successful:', data);
      toast.success('Successfully signed in!');
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected signin error:', error);
      toast.error('An unexpected error occurred during signin');
      return { 
        error: { 
          message: 'An unexpected error occurred during signin',
          name: 'UnexpectedError',
          status: 500
        } as AuthError, 
        data: null 
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Signout error:', error);
        toast.error('Error signing out');
        return { error };
      }

      console.log('Signout successful');
      toast.success('Successfully signed out');
      return { error: null };
    } catch (error) {
      console.error('Unexpected signout error:', error);
      toast.error('An unexpected error occurred during signout');
      return { 
        error: { 
          message: 'An unexpected error occurred during signout',
          name: 'UnexpectedError',
          status: 500
        } as AuthError
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}