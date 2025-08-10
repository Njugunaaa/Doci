import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Heart, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import HealthQuestionnaire from '@/components/auth/HealthQuestionnaire';
import { Badge } from "@/components/ui/badge";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licenseNumber: '',
    bio: '',
    yearsExperience: '',
    consultationFee: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Please enter a valid email');
    if (!formData.password) errors.push('Password is required');
    if (formData.password.length < 8) errors.push('Password must be at least 8 characters');
    if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match');
    
    if (userType === 'doctor') {
      if (!formData.specialization.trim()) errors.push('Specialization is required');
      if (!formData.licenseNumber.trim()) errors.push('License number is required');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        full_name: formData.fullName,
        fullName: formData.fullName,
        user_type: userType,
        userType: userType,
        email: formData.email
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
      if (userType === 'doctor' && data.user) {
        setTimeout(async () => {
          try {
            const { error: doctorError } = await supabase
              .from('doctors')
              .insert({
                id: data.user.id,
                specialization: formData.specialization,
                license_number: formData.licenseNumber,
                bio: formData.bio || null,
                years_experience: formData.yearsExperience ? parseInt(formData.yearsExperience) : null,
                consultation_fee: formData.consultationFee ? parseFloat(formData.consultationFee) : null,
                verification_status: 'pending',
                is_verified: false
              });
            
            if (doctorError) {
              console.error('Error creating doctor profile:', doctorError);
              toast.error('Account created but failed to save doctor details');
            } else {
              console.log('Doctor profile created successfully');
              toast.success('Doctor profile created! Verification pending.');
            }
          } catch (doctorError) {
            console.error('Doctor profile creation error:', doctorError);
            toast.error('Account created but failed to save doctor details');
          }
        }, 2000);
        
        setStep(2); // Move to verification step for doctors
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Very Weak';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
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
                    <Heart className="w-6 h-6 text-red-600" />
                    Patient Registration
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 ? 'Fill in your details to get started' : 'Upload verification documents'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Please fix the following errors:</span>
                  </div>
                  <ul className="text-xs text-red-700 space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* User Type Selection */}
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={userType === 'patient' ? 'default' : 'outline'}
                  onClick={() => setUserType('patient')}
                  className={`flex-1 ${userType === 'patient' ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : ''}`}
                  disabled={loading}
                >
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio (Optional)</Label>
                        <Input
                          id="bio"
                          type="text"
                          placeholder="Brief description about yourself"
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="yearsExperience">Years of Experience</Label>
                          <Input
                            id="yearsExperience"
                            type="number"
                            placeholder="e.g., 5"
                            value={formData.yearsExperience}
                            onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                            disabled={loading}
                            min="0"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                          <Input
                            id="consultationFee"
                            type="number"
                            placeholder="e.g., 150"
                            value={formData.consultationFee}
                            onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                            disabled={loading}
                            min="0"
                            step="0.01"
                          />
                        </div>
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
                        placeholder="Create a password (min 8 characters)"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={8}
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
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Password Strength:</span>
                          <span className={`text-xs font-medium ${
                            passwordStrength <= 2 ? 'text-red-600' : 
                            passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Include: uppercase, lowercase, numbers, and special characters
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 pr-10"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="flex items-center gap-2 text-xs">
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span className="text-red-600">Passwords don't match</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
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