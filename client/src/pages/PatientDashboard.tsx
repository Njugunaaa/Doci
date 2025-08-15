import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Activity, 
  Apple, 
  ShoppingCart, 
  Users, 
  Crown, 
  MessageCircle,
  Heart,
  Target,
  Calendar,
  TrendingUp,
  Mic,
  Stethoscope,
  User,
  Bell,
  Search,
  MoreVertical,
  FileText,
  Pill,
  Thermometer,
  Scale,
  Clock,
  ChevronRight,
  Plus,
  Video,
  Phone
} from 'lucide-react';
import SmartDocChat from '@/components/patient/SmartDocChat';
import EnhancedSmartDocChat from '@/components/patient/EnhancedSmartDocChat';
import FitnessTracker from '@/components/patient/FitnessTracker';
import NutritionPlanner from '@/components/patient/NutritionPlanner';
import PharmacyShop from '@/components/patient/PharmacyShop';
import CommunityGroups from '@/components/patient/CommunityGroups';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { ModernNavbar } from '@/components/shared/ModernNavbar';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, loading, signOut } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
    }
  }, [user, loading, setLocation]);

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 medical-hero-pattern">
      <ModernNavbar 
        title="Patient Dashboard"
        subtitle={`Hello ${user.fullName || 'Patient'}, welcome back!`}
      />

      <div className="flex">
        {/* Modern Sidebar */}
        <aside className="w-20 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-4">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'smartdoc' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'smartdoc' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('smartdoc')}
            >
              <Brain className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'fitness' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'fitness' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('fitness')}
            >
              <Activity className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'nutrition' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'nutrition' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('nutrition')}
            >
              <Apple className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'pharmacy' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'pharmacy' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pharmacy')}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'community' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'community' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('community')}
            >
              <Users className="w-5 h-5" />
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 animate-slide-up-medical">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Patient Info Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 glass-medical border-primary/20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600 text-white">
                  {/* Medical Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="medical-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="2" fill="currentColor"/>
                          <path d="M15 20h10M20 15v10" stroke="currentColor" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#medical-pattern)"/>
                    </svg>
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white">Hello, {user.fullName || 'Patient'}!</h2>
                        <p className="text-blue-100">Your health overview</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-white/30">
                          <AvatarImage src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face" />
                          <AvatarFallback className="bg-white/30 text-white text-xl">
                            {user.fullName?.charAt(0) || 'J'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-bold text-white">A+</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{user.fullName || 'John Doe'}</h3>
                        <p className="text-blue-100 mb-2">Male • 28 years old</p>
                        <div className="flex items-center gap-4 text-sm text-blue-100">
                          <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4" />
                            <span>68 kg</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span>175 cm</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1 text-blue-100">
                            <span>Health Score</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="h-2 bg-white/20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vital Signs */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Vital Signs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Blood Pressure</p>
                          <p className="text-xs text-gray-500">120/80 mmHg</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Normal
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Heart Rate</p>
                          <p className="text-xs text-gray-500">72 bpm</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Good
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Temperature</p>
                          <p className="text-xs text-gray-500">36.5°C</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Normal
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medical History & Appointments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Medical History</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Record
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Annual Checkup</p>
                          <p className="text-xs text-gray-500">12/2/2023</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Pill className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Vaccination</p>
                          <p className="text-xs text-gray-500">15/1/2024</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Stethoscope className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Blood Test</p>
                          <p className="text-xs text-gray-500">28/1/2024</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              DS
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">Dr. Sarah Wilson</p>
                            <p className="text-xs text-gray-600">General Practitioner</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-600">Today</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>2:00 PM - 2:30 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          <span>Video Call</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Video className="w-3 h-3 mr-1" />
                          Join Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              MC
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">Dr. Michael Chen</p>
                            <p className="text-xs text-gray-600">Cardiologist</p>
                          </div>
                        </div>
                        <Badge variant="outline">Tomorrow</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>10:00 AM - 10:30 AM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" />
                          <span>In-person</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Today's Steps</p>
                        <p className="text-2xl font-bold text-gray-900">8,547</p>
                        <p className="text-xs text-green-600">+12% from yesterday</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Water Intake</p>
                        <p className="text-2xl font-bold text-gray-900">1.8L</p>
                        <p className="text-xs text-orange-600">0.7L remaining</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="text-2xl font-bold text-gray-900">1,850</p>
                        <p className="text-xs text-green-600">350 remaining</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Apple className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Sleep</p>
                        <p className="text-2xl font-bold text-gray-900">7.5h</p>
                        <p className="text-xs text-green-600">Good quality</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Smart Doc AI Highlight */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Smart Doci AI</h3>
                        <p className="text-gray-600">Your personal health assistant</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className="bg-purple-100 text-purple-700">
                            <Mic className="w-3 h-3 mr-1" />
                            Voice Enabled
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            24/7 Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => setActiveTab('smartdoc')}
                    >
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'smartdoc' && <EnhancedSmartDocChat />}
          {activeTab === 'fitness' && <FitnessTracker />}
          {activeTab === 'nutrition' && <NutritionPlanner />}
          {activeTab === 'pharmacy' && <PharmacyShop />}
          {activeTab === 'community' && <CommunityGroups />}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;