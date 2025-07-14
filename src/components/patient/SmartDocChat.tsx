
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Mic, MicOff, Send, User, Bot, Heart, Stethoscope } from 'lucide-react';

export default function SmartDocChat() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: 'user',
      message: 'I have been experiencing headaches and fatigue for the past few days.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'bot',
      message: 'I understand you\'re experiencing headaches and fatigue. These symptoms can have various causes. Can you tell me more about: \n\n• When did these symptoms start?\n• How severe are the headaches (1-10 scale)?\n• Any triggers you\'ve noticed?\n• Are you getting enough sleep and staying hydrated?',
      timestamp: '10:31 AM',
      suggestions: ['Possible causes', 'Home remedies', 'When to see a doctor']
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: conversations.length + 1,
      type: 'user' as const,
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: conversations.length + 2,
        type: 'bot' as const,
        message: 'Based on your symptoms, here are some recommendations:\n\n🏥 **Immediate care**: Ensure adequate rest and hydration\n💊 **Relief**: Consider over-the-counter pain relievers if needed\n⚠️ **Warning signs**: Seek immediate medical attention if you experience severe headaches, vision changes, or persistent high fever\n\nWould you like me to suggest some doctors in your area?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Find doctors', 'Diet recommendations', 'Exercise tips']
      };
      setConversations(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would integrate with speech-to-text API
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            Smart Doc AI Assistant
            <Badge className="bg-white/20 text-white ml-auto">
              <Heart className="w-3 h-3 mr-1" />
              Available 24/7
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Doc</h3>
                <p className="text-xs text-green-600">Online • AI Health Assistant</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Voice Enabled
            </Badge>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversations.map((conv) => (
            <div key={conv.id} className={`flex gap-3 ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {conv.type === 'bot' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
              )}
              
              <div className={`max-w-[70%] ${conv.type === 'user' ? 'order-2' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  conv.type === 'user' 
                    ? 'bg-blue-600 text-white ml-auto' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{conv.message}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{conv.timestamp}</span>
                </div>

                {conv.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {conv.suggestions.map((suggestion, idx) => (
                      <Button 
                        key={idx} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7"
                        onClick={() => setMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {conv.type === 'user' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your symptoms or ask a health question..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={toggleRecording}
              >
                {isRecording ? 
                  <MicOff className="w-4 h-4 text-red-500" /> : 
                  <Mic className="w-4 h-4 text-gray-500" />
                }
              </Button>
            </div>
            <Button onClick={handleSendMessage} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Smart Doc provides health information and suggestions. Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </Card>

      {/* Recommended Doctors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            Recommended Doctors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Dr. Sarah Wilson</h4>
                <p className="text-sm text-gray-600">General Practitioner</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                  <span className="text-xs text-gray-500">• 4.9 ★</span>
                </div>
              </div>
              <Button size="sm" variant="outline">Message</Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Dr. Michael Chen</h4>
                <p className="text-sm text-gray-600">Internal Medicine</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Busy</span>
                  <span className="text-xs text-gray-500">• 4.8 ★</span>
                </div>
              </div>
              <Button size="sm" variant="outline">Message</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
