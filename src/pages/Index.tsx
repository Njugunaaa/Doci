
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Zap, Stethoscope, Brain, Activity, Apple } from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');

  const handleLogin = (type: 'patient' | 'doctor') => {
    setUserType(type);
    setShowLogin(true);
  };

  const handleSignup = (type: 'patient' | 'doctor') => {
    setUserType(type);
    setShowSignup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HealthPlatform</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleLogin('patient')}>
              Login
            </Button>
            <Button onClick={() => handleSignup('patient')} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            🎉 Now with AI-Powered Health Assistant
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Complete
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Health </span>
            Companion
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified doctors, track your fitness journey, get AI-powered health insights, 
            and join a community that cares about your wellbeing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => handleSignup('patient')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3"
            >
              Start as Patient
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => handleSignup('doctor')}
              className="text-lg px-8 py-3 border-2 hover:bg-blue-50"
            >
              Join as Doctor
            </Button>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Smart Doc AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant health insights with our AI-powered chatbot. Voice-enabled for easy interaction.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Fitness Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track steps, set goals, monitor heart rate and visualize your fitness progress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Apple className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Nutrition Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-suggested meal plans based on your goals, BMR, and health conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Health Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join support groups, share experiences, and connect with others on similar health journeys.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Are you a Healthcare Professional?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join our platform to connect with patients, provide consultations, and be part of a trusted healthcare network.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => handleSignup('doctor')}
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
            >
              Join as Doctor
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Zap className="w-4 h-4 mr-1" />
            Doci Plus
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Unlock Premium Health Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Virtual Doctor Access</h3>
              <p className="text-gray-600 text-sm">Connect with doctors anytime, anywhere</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600 text-sm">Get faster responses and premium care</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Advanced AI Reports</h3>
              <p className="text-gray-600 text-sm">Detailed health insights and analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">HealthPlatform</span>
          </div>
          <p className="text-gray-400">
            Your trusted partner in health and wellness
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal 
        open={showLogin} 
        onOpenChange={setShowLogin}
        userType={userType}
      />
      <SignupModal 
        open={showSignup} 
        onOpenChange={setShowSignup}
        userType={userType}
      />
    </div>
  );
};

export default Index;
