import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import HealthQuestionnaire from '@/components/auth/HealthQuestionnaire';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
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
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (userType === 'doctor' && (!formData.specialization || !formData.licenseNumber)) {
      toast.error('Please fill in all doctor-specific fields');
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

      console.log('Attempting to sign up with:', { email: formData.email, userData });

      const { error, data } = await signUp(formData.email, formData.password, userData);
      
      if (error) {
        console.error('Signup error:', error);
        toast.error(error.message || 'Failed to create account');
        return;
      }

      console.log('Signup successful:', data);
      
      // If doctor, create doctor profile
      if (userType === 'doctor') {
        try {
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
                toast.error('Account created but failed to save doctor details');
              } else {
                console.log('Doctor profile created successfully');
              }
            }
          }, 2000);
          
          setStep(2); // Move to verification step for doctors
        } catch (doctorError) {
          console.error('Doctor profile creation error:', doctorError);
          toast.error('Account created but failed to save doctor details');
        }
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.');
        // Show health questionnaire for patients
        setShowQuestionnaire(true);
      }
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationUpload = () => {
    toast.success('Verification documents submitted! You will receive an email once your account is approved.');
    navigate('/login');
  };

  const handleQuestionnaireComplete = (healthData: any) => {
    console.log('Health questionnaire completed:', healthData);
    setShowQuestionnaire(false);
    toast.success('Welcome to Doci\'s! Your health profile has been created.');
    navigate('/patient-dashboard');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Doci's</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join Doci's and start your health journey</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                {userType === 'doctor' ? (
                  <>
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                    Doctor Registration
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6 text-green-600" />
                    Patient Registration
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 ? 'Fill in your details to get started' : 'Upload verification documents'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* User Type Selection */}
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={userType === 'patient' ? 'default' : 'outline'}
                  onClick={() => setUserType('patient')}
                  className="flex-1"
                  disabled={loading}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Patient
                </Button>
                <Button
                  type="button"
                  variant={userType === 'doctor' ? 'default' : 'outline'}
                  onClick={() => setUserType('doctor')}
                  className="flex-1"
                  disabled={loading}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor
                </Button>
              </div>

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
                        disabled={loading}
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
                        disabled={loading}
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
                          disabled={loading}
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
                          disabled={loading}
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
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={loading}
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
                        disabled={loading}
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

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <HealthQuestionnaire 
        open={showQuestionnaire}
        onOpenChange={setShowQuestionnaire}
        onComplete={handleQuestionnaireComplete}
      />
    </>
  );
}