import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  FileText, 
  Clock,
  User,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';

export default function DoctorPatientChat() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('messages');

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 34,
      lastMessage: 'Thank you for the prescription, feeling much better!',
      timestamp: '2 hours ago',
      status: 'online',
      unread: 0,
      condition: 'Hypertension',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 28,
      lastMessage: 'I have been experiencing headaches for the past 3 days...',
      timestamp: '5 minutes ago',
      status: 'online',
      unread: 2,
      condition: 'Migraine',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 45,
      lastMessage: 'Can we schedule a follow-up appointment?',
      timestamp: '1 hour ago',
      status: 'offline',
      unread: 1,
      condition: 'Diabetes',
      avatar: 'MB'
    },
    {
      id: 4,
      name: 'Emily Davis',
      age: 31,
      lastMessage: 'The medication is working well, no side effects',
      timestamp: '3 hours ago',
      status: 'online',
      unread: 0,
      condition: 'Anxiety',
      avatar: 'ED'
    }
  ];

  const conversations = {
    2: [
      {
        id: 1,
        sender: 'patient',
        message: 'Hello Dr. Wilson, I have been experiencing severe headaches for the past 3 days. They seem to get worse in the evening.',
        timestamp: '10:30 AM',
        read: true
      },
      {
        id: 2,
        sender: 'patient',
        message: 'The pain is mostly on the right side of my head and I feel nauseous sometimes.',
        timestamp: '10:32 AM',
        read: true
      },
      {
        id: 3,
        sender: 'doctor',
        message: 'I understand your concern, Sarah. Can you tell me if you\'ve had any recent changes in your sleep pattern, stress levels, or diet?',
        timestamp: '10:35 AM',
        read: true
      },
      {
        id: 4,
        sender: 'patient',
        message: 'I have been working late nights this week and probably not getting enough sleep. Also been drinking more coffee than usual.',
        timestamp: '10:37 AM',
        read: true
      },
      {
        id: 5,
        sender: 'doctor',
        message: 'That could definitely be contributing factors. I recommend:\n\n1. Try to maintain regular sleep schedule (7-8 hours)\n2. Reduce caffeine intake gradually\n3. Stay hydrated\n4. Apply cold compress to the painful area\n\nIf symptoms persist or worsen, we should schedule an in-person consultation.',
        timestamp: '10:40 AM',
        read: true
      },
      {
        id: 6,
        sender: 'patient',
        message: 'Thank you doctor. Should I take any pain medication in the meantime?',
        timestamp: '10:42 AM',
        read: false
      }
    ]
  };

  const patientInfo = {
    2: {
      medicalHistory: ['Migraine', 'Seasonal Allergies'],
      currentMedications: ['Sumatriptan 50mg PRN', 'Loratadine 10mg daily'],
      allergies: ['Penicillin', 'Shellfish'],
      vitals: {
        bloodPressure: '118/76',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '65 kg'
      },
      lastVisit: 'March 10, 2024',
      nextAppointment: 'March 25, 2024 - 2:00 PM'
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedPatient) return;

    // Add message to conversation (in real app, this would be sent to backend)
    console.log('Sending message:', message, 'to patient:', selectedPatient.id);
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Patient Communications
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Patient List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Patients</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                    selectedPatient?.id === patient.id 
                      ? 'bg-blue-50 border-l-blue-500' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {patient.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        patient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{patient.name}</h4>
                        <div className="flex items-center gap-1">
                          {patient.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                              {patient.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{patient.timestamp}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-1">Age: {patient.age} • {patient.condition}</p>
                      <p className="text-xs text-gray-500 truncate">{patient.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedPatient ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {selectedPatient.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedPatient.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Age: {selectedPatient.age}</span>
                        <span>•</span>
                        <span>{selectedPatient.condition}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          selectedPatient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="history">Medical History</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="messages" className="flex-1 flex flex-col mt-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversations[selectedPatient.id as keyof typeof conversations]?.map((msg) => (
                      <div key={msg.id} className={`flex gap-3 ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'patient' && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {selectedPatient.avatar}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] ${msg.sender === 'doctor' ? 'order-2' : ''}`}>
                          <div className={`p-3 rounded-lg ${
                            msg.sender === 'doctor' 
                              ? 'bg-blue-600 text-white ml-auto' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{msg.message}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            {msg.sender === 'doctor' && (
                              <div className="flex items-center">
                                {msg.read ? (
                                  <CheckCircle className="w-3 h-3 text-blue-500" />
                                ) : (
                                  <Clock className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {msg.sender === 'doctor' && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              <Stethoscope className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message to the patient..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!message.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="flex-1 p-4">
                  <div className="space-y-4">
                    {patientInfo[selectedPatient.id as keyof typeof patientInfo] && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">Current Vitals</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Blood Pressure:</span>
                                <span className="font-medium">{patientInfo[selectedPatient.id as keyof typeof patientInfo].vitals.bloodPressure}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Heart Rate:</span>
                                <span className="font-medium">{patientInfo[selectedPatient.id as keyof typeof patientInfo].vitals.heartRate}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Temperature:</span>
                                <span className="font-medium">{patientInfo[selectedPatient.id as keyof typeof patientInfo].vitals.temperature}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Weight:</span>
                                <span className="font-medium">{patientInfo[selectedPatient.id as keyof typeof patientInfo].vitals.weight}</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">Medical History</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {patientInfo[selectedPatient.id as keyof typeof patientInfo].medicalHistory.map((condition, idx) => (
                                  <Badge key={idx} variant="outline" className="mr-2">
                                    {condition}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">Current Medications</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {patientInfo[selectedPatient.id as keyof typeof patientInfo].currentMedications.map((med, idx) => (
                                  <div key={idx} className="text-sm p-2 bg-blue-50 rounded">
                                    {med}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                Allergies
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {patientInfo[selectedPatient.id as keyof typeof patientInfo].allergies.map((allergy, idx) => (
                                  <Badge key={idx} variant="destructive" className="mr-2">
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="appointments" className="flex-1 p-4">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-500" />
                          Next Appointment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">
                          {patientInfo[selectedPatient.id as keyof typeof patientInfo]?.nextAppointment}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Follow-up consultation</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Last Visit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          {patientInfo[selectedPatient.id as keyof typeof patientInfo]?.lastVisit}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Initial consultation for migraine symptoms</p>
                      </CardContent>
                    </Card>

                    <Button className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule New Appointment
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a patient to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}