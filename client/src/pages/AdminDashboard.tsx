import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp,
  Search,
  Bell,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Filter,
  AlertTriangle,
  Stethoscope,
  Heart,
  UserCheck,
  UserX,
  MessageSquare,
  Calendar,
  Activity,
  Database
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [rejectionMessage, setRejectionMessage] = useState('');
  const { user, loading, signOut } = useAuth();
  const [, setLocation] = useLocation();

  // Mock data for pending doctors
  const [pendingDoctors, setPendingDoctors] = useState([
    {
      id: 1,
      fullName: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@email.com',
      specialization: 'General Practitioner',
      licenseNumber: 'GP-2024-001',
      yearsExperience: 8,
      consultationFee: 150,
      bio: 'Experienced GP with focus on preventive care and family medicine.',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      documents: [
        { type: 'Medical License', url: '/docs/license-001.pdf' },
        { type: 'Medical Degree', url: '/docs/degree-001.pdf' }
      ]
    },
    {
      id: 2,
      fullName: 'Dr. Michael Ochieng',
      email: 'michael.ochieng@email.com',
      specialization: 'Cardiology',
      licenseNumber: 'CARD-2024-002',
      yearsExperience: 12,
      consultationFee: 250,
      bio: 'Cardiologist specializing in heart disease prevention and treatment.',
      status: 'pending',
      submittedAt: '2024-01-16T14:20:00Z',
      documents: [
        { type: 'Medical License', url: '/docs/license-002.pdf' },
        { type: 'Medical Degree', url: '/docs/degree-002.pdf' },
        { type: 'Specialization Certificate', url: '/docs/cardio-cert-002.pdf' }
      ]
    },
    {
      id: 3,
      fullName: 'Dr. Grace Wanjiku',
      email: 'grace.wanjiku@email.com',
      specialization: 'Pediatrics',
      licenseNumber: 'PED-2024-003',
      yearsExperience: 6,
      consultationFee: 180,
      bio: 'Pediatrician with expertise in child development and immunizations.',
      status: 'pending',
      submittedAt: '2024-01-17T09:15:00Z',
      documents: [
        { type: 'Medical License', url: '/docs/license-003.pdf' },
        { type: 'Medical Degree', url: '/docs/degree-003.pdf' }
      ]
    }
  ]);

  const [approvedDoctors] = useState([
    {
      id: 4,
      fullName: 'Dr. James Mwangi',
      specialization: 'Orthopedics',
      patients: 45,
      rating: 4.8,
      consultations: 120,
      status: 'active'
    },
    {
      id: 5,
      fullName: 'Dr. Mary Njeri',
      specialization: 'Dermatology',
      patients: 38,
      rating: 4.9,
      consultations: 95,
      status: 'active'
    }
  ]);

  const [systemStats] = useState({
    totalUsers: 1247,
    totalDoctors: 89,
    pendingApprovals: pendingDoctors.length,
    totalConsultations: 2456,
    monthlyGrowth: 15.2,
    activeUsers: 892
  });

  const handleApproveDoctor = async (doctorId: number) => {
    try {
      setPendingDoctors(prev => prev.filter(doc => doc.id !== doctorId));
      toast.success('Doctor approved successfully!');
    } catch (error) {
      toast.error('Failed to approve doctor');
    }
  };

  const handleRejectDoctor = async (doctorId: number, message: string) => {
    try {
      setPendingDoctors(prev => prev.filter(doc => doc.id !== doctorId));
      toast.success('Doctor application rejected with feedback sent');
      setRejectionMessage('');
      setSelectedDoctor(null);
    } catch (error) {
      toast.error('Failed to reject doctor application');
    }
  };

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!user || user.userType !== 'admin')) {
      setLocation('/');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.userType !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Doci's Platform Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search users, doctors..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{pendingDoctors.length}</span>
                </div>
              </Button>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-red-100 text-red-600">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">System Administrator</p>
                </div>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-20 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-4">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'overview' ? 'bg-red-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'doctors' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl relative ${activeTab === 'doctors' ? 'bg-red-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('doctors')}
            >
              <Stethoscope className="w-5 h-5" />
              {pendingDoctors.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{pendingDoctors.length}</span>
                </div>
              )}
            </Button>
            
            <Button
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'users' ? 'bg-red-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-5 h-5" />
            </Button>
            
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              size="icon"
              className={`w-12 h-12 rounded-xl ${activeTab === 'analytics' ? 'bg-red-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <Database className="w-5 h-5" />
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-100">Total Users</p>
                        <p className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                        <p className="text-xs text-blue-100">+{systemStats.monthlyGrowth}% this month</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-100">Active Doctors</p>
                        <p className="text-3xl font-bold">{systemStats.totalDoctors}</p>
                        <p className="text-xs text-green-100">Verified professionals</p>
                      </div>
                      <Stethoscope className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-100">Pending Approvals</p>
                        <p className="text-3xl font-bold">{systemStats.pendingApprovals}</p>
                        <p className="text-xs text-orange-100">Require review</p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-100">Consultations</p>
                        <p className="text-3xl font-bold">{systemStats.totalConsultations.toLocaleString()}</p>
                        <p className="text-xs text-purple-100">Total completed</p>
                      </div>
                      <Activity className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Dr. James Mwangi approved</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New patient registration: Mary Wanjiru</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Dr. Grace Wanjiku submitted verification documents</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Doctor Verification</h2>
                  <p className="text-gray-600">{pendingDoctors.length} applications pending review</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Pending Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Pending Applications ({pendingDoctors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingDoctors.map((doctor) => (
                      <div key={doctor.id} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {doctor.fullName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{doctor.fullName}</h3>
                              <p className="text-sm text-gray-600">{doctor.specialization}</p>
                              <p className="text-sm text-gray-600">{doctor.email}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span>License: {doctor.licenseNumber}</span>
                                <span>Experience: {doctor.yearsExperience} years</span>
                                <span>Fee: KSh {doctor.consultationFee * 130}/consultation</span>
                              </div>
                              <p className="text-sm text-gray-700 mt-2">{doctor.bio}</p>
                              
                              <div className="flex items-center gap-2 mt-3">
                                <span className="text-xs text-gray-600">Documents:</span>
                                {doctor.documents.map((doc, idx) => (
                                  <Button key={idx} variant="outline" size="sm" className="h-6 text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {doc.type}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveDoctor(doctor.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => setSelectedDoctor(doctor)}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Application</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <p className="text-sm text-gray-600">
                                    Provide feedback for {selectedDoctor?.fullName} on why their application was rejected:
                                  </p>
                                  <Textarea
                                    placeholder="Enter rejection reason and suggestions for improvement..."
                                    value={rejectionMessage}
                                    onChange={(e) => setRejectionMessage(e.target.value)}
                                    rows={4}
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="destructive"
                                      onClick={() => selectedDoctor && handleRejectDoctor(selectedDoctor.id, rejectionMessage)}
                                      disabled={!rejectionMessage.trim()}
                                    >
                                      Send Rejection
                                    </Button>
                                    <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Approved Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Active Doctors ({approvedDoctors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvedDoctors.map((doctor) => (
                      <div key={doctor.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-green-100 text-green-600">
                                {doctor.fullName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{doctor.fullName}</h4>
                              <p className="text-sm text-gray-600">{doctor.specialization}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                                <span>{doctor.patients} patients</span>
                                <span>⭐ {doctor.rating}</span>
                                <span>{doctor.consultations} consultations</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-gray-600">john.doe@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Patient</Badge>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-green-100 text-green-600">MW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Mary Wanjiru</p>
                          <p className="text-sm text-gray-600">mary.wanjiru@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Patient</Badge>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">System Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">+15.2%</div>
                      <p className="text-sm text-gray-600">This month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{systemStats.activeUsers}</div>
                      <p className="text-sm text-gray-600">Currently online</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">99.9%</div>
                      <p className="text-sm text-gray-600">Uptime</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;