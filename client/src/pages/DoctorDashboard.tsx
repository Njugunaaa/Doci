import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  MessageCircle,
  TrendingUp,
  Clock,
  Heart,
  FileText,
  Video,
  Phone,
  Search,
  Bell,
  MoreVertical,
  Activity,
  Brain,
  Target,
  ChevronRight,
  Plus,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Download,
  Upload,
  Pill,
  Thermometer,
  Scale
} from 'lucide-react';
import DoctorPatientChat from '@/components/doctor/DoctorPatientChat';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

const DoctorDashboard = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock patient data for the 3D body visualization
  const currentPatient = {
    id: 1,
    name: 'Rachman Bilhaq',
    age: 28,
    gender: 'Male',
    weight: '68 kg',
    diagnosis: 'Knee replacement',
    bloodPressure: '120/80',
    heartRate: '110',
    avatar: 'RB'
  };

  const patientQueue = [
    { id: 1, name: 'Sarah Johnson', time: '2:00 PM', type: 'Follow-up', urgent: false },
    { id: 2, name: 'Michael Brown', time: '2:30 PM', type: 'Consultation', urgent: true },
    { id: 3, name: 'Emily Davis', time: '3:00 PM', type: 'Check-up', urgent: false },
    { id: 4, name: 'James Wilson', time: '3:30 PM', type: 'Emergency', urgent: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Patient Queue</h1>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </Button>
                  <span className="text-sm text-gray-500">6 of 12</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Find Anything"
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    JB
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Dr. John Billoq</p>
                  <p className="text-xs text-gray-500">Orthopedist</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              variant={activeTab === 'patients' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl relative ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('patients')}
            >
              <MessageCircle className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">12</span>
              </div>
            </Button>
            
            <Button
              variant={activeTab === 'appointments' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <TrendingUp className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'files' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'files' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('files')}
            >
              <FileText className="w-5 h-5" />
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 3D Body Visualization */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-gray-100 to-gray-200">
                <CardContent className="p-6 h-[600px] relative">
                  <div className="absolute top-6 left-6 z-10">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Target className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Activity className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 3D Body Placeholder */}
                  <div className="flex items-center justify-center h-full">
                    <div className="relative">
                      <div className="w-64 h-96 bg-gradient-to-b from-red-300 to-red-400 rounded-full opacity-80 flex items-center justify-center">
                        <div className="text-center text-white">
                          <User className="w-32 h-32 mx-auto mb-4" />
                          <p className="text-lg font-semibold">3D Body Model</p>
                          <p className="text-sm opacity-80">Interactive Patient View</p>
                        </div>
                      </div>
                      
                      {/* Knee Highlight */}
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                        <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-100 rounded"></div>
                          </div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs">
                          Knee Replacement
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Info Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-lg">Patient Info</CardTitle>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {currentPatient.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{currentPatient.name}</h3>
                        <p className="text-sm text-gray-600">{currentPatient.gender} • {currentPatient.age} years old</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-700">{currentPatient.weight}</Badge>
                          <Badge className="bg-green-100 text-green-700">A+</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">Diagnosis:</span>
                      </div>
                      <p className="text-sm text-orange-700">{currentPatient.diagnosis}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Vital Signs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vital Signs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Blood Pressure</span>
                      </div>
                      <span className="font-semibold">{currentPatient.bloodPressure}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-sm font-medium">Heart Rate</span>
                      </div>
                      <span className="font-semibold">{currentPatient.heartRate} bpm</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical History & X-Ray Docs */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Medical History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium">Backpain Checkup</p>
                          <p className="text-xs text-gray-500">12/2/2019</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <Pill className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs font-medium">Knee Surgery</p>
                          <p className="text-xs text-gray-500">14/2/2023</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs font-medium">Knee Control after Surgery</p>
                          <p className="text-xs text-gray-500">19/2/2023</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium">Medical Checkup</p>
                          <p className="text-xs text-gray-500">12/9/2023</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">X-Ray Docs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="relative">
                          <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                            <div className="w-16 h-16 bg-gray-600 rounded opacity-80"></div>
                          </div>
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/20 hover:bg-white/40">
                            <Eye className="w-3 h-3 text-white" />
                          </Button>
                        </div>
                        <p className="text-xs text-center text-gray-600">(2D/2239/01/2/2023)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Add Notes
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    <Pill className="w-3 h-3" />
                    Add Prescription
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && <DoctorPatientChat />}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Appointment
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {patientQueue.map((patient) => (
                      <div key={patient.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${patient.urgent ? 'border-red-200 bg-red-50' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-gray-600">{patient.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {patient.urgent && (
                              <Badge variant="destructive">Urgent</Badge>
                            )}
                            <span className="text-sm font-medium">{patient.time}</span>
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4 mr-2" />
                              Start
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <p className="text-sm text-gray-600">Patients Today</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4</div>
                      <p className="text-sm text-gray-600">Remaining</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-900">247</p>
                        <p className="text-xs text-green-600">+12% this month</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Consultations</p>
                        <p className="text-2xl font-bold text-gray-900">89</p>
                        <p className="text-xs text-green-600">+8% this week</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold text-gray-900">94%</p>
                        <p className="text-xs text-green-600">Excellent</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.9</p>
                        <p className="text-xs text-green-600">⭐⭐⭐⭐⭐</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Patient Files</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">X-Ray Images</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="w-12 h-12 bg-gray-600 rounded opacity-80"></div>
                        </div>
                        <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="w-12 h-12 bg-gray-600 rounded opacity-80"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Lab Reports</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium">Blood Test Results</p>
                          <p className="text-xs text-gray-500">15/2/2024</p>
                        </div>
                        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium">Urine Analysis</p>
                          <p className="text-xs text-gray-500">10/2/2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Prescriptions</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium">Pain Relief</p>
                          <p className="text-xs text-gray-500">Active</p>
                        </div>
                        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium">Antibiotics</p>
                          <p className="text-xs text-gray-500">Completed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;