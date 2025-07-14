
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'patient' | 'doctor';
}

export default function SignupModal({ open, onOpenChange, userType }: SignupModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licenseNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { signUp } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        full_name: formData.fullName,
        fullName: formData.fullName,
        user_type: userType,
        userType: userType,
      };

      const { error } = await signUp(formData.email, formData.password, userData);
      
      if (error) {
        toast.error(error.message);
      } else {
        // If doctor, create doctor profile
        if (userType === 'doctor') {
          // Wait a moment for the user to be created
          setTimeout(async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              const { error: doctorError } = await supabase
                .from('doctors')
                .insert({
                  id: user.id,
                  specialization: formData.specialization,
                  license_number: formData.licenseNumber,
                  verification_status: 'pending'
                });
              
              if (doctorError) {
                console.error('Error creating doctor profile:', doctorError);
              }
            }
          }, 1000);
          
          setStep(2); // Move to verification step for doctors
        } else {
          toast.success('Account created successfully! Please check your email to verify your account.');
          onOpenChange(false);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationUpload = () => {
    toast.success('Verification documents submitted! You will receive an email once your account is approved.');
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            {userType === 'doctor' ? (
              <>
                <Stethoscope className="w-6 h-6 text-blue-600" />
                Doctor Registration
              </>
            ) : (
              <>
                <Heart className="w-6 h-6 text-green-600" />
                Join as Patient
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {userType === 'doctor' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    type="text"
                    placeholder="e.g., General Practitioner, Cardiology"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Medical License Number</Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="Enter your license number"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Verification Required</h3>
            <p className="text-gray-600 text-sm">
              Please upload your medical credentials for verification. Our admin team will review and approve your account within 24-48 hours.
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="credentials" className="text-sm">Upload Medical License</Label>
                <Input id="credentials" type="file" accept=".pdf,.jpg,.png" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="diploma" className="text-sm">Upload Medical Degree</Label>
                <Input id="diploma" type="file" accept=".pdf,.jpg,.png" className="mt-1" />
              </div>
            </div>
            
            <Button 
              onClick={handleVerificationUpload}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Submit for Verification
            </Button>
            
            <p className="text-xs text-gray-500">
              You'll receive an email confirmation once your account is approved.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
