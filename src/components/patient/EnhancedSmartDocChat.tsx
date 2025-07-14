import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Mic, 
  MicOff, 
  Send, 
  User, 
  Bot, 
  Heart, 
  Stethoscope,
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function EnhancedSmartDocChat() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m Smart Doci, your AI health assistant. I can help you with:\n\n🔍 **Symptom Analysis** - Describe your symptoms\n💊 **Medication Info** - Ask about medications\n🏥 **Doctor Connections** - Find specialists\n📋 **Health Tips** - Get personalized advice\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['I have a headache', 'Check my symptoms', 'Find a doctor', 'Medication side effects']
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  // Medical conditions database for search
  const medicalConditions = [
    'Headache', 'Migraine', 'Fever', 'Cough', 'Sore throat', 'Chest pain',
    'Shortness of breath', 'Dizziness', 'Nausea', 'Vomiting', 'Diarrhea',
    'Constipation', 'Back pain', 'Joint pain', 'Muscle pain', 'Fatigue',
    'Insomnia', 'Anxiety', 'Depression', 'Skin rash', 'Allergic reaction',
    'High blood pressure', 'Diabetes', 'Heart disease', 'Asthma', 'Arthritis'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
        toast.success('Voice input captured!');
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error('Voice recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info('Listening... Speak now');
    }
  };

  const speakMessage = (text: string) => {
    if (!synthRef.current) {
      toast.error('Speech synthesis not supported');
      return;
    }

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const searchConditions = (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    const results = medicalConditions.filter(condition =>
      condition.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setSearchResults(results);
    setShowSearch(results.length > 0);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: conversations.length + 1,
      type: 'user' as const,
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => [...prev, newMessage]);
    const currentMessage = message;
    setMessage('');
    setShowSearch(false);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      setConversations(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    // Symptom analysis
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      response = `I understand you're experiencing headaches. Let me help you analyze this:\n\n**Possible causes:**\n• Tension or stress\n• Dehydration\n• Eye strain\n• Sinus congestion\n• Lack of sleep\n\n**Immediate relief:**\n• Rest in a quiet, dark room\n• Apply cold or warm compress\n• Stay hydrated\n• Gentle neck/shoulder massage\n\n⚠️ **Seek immediate care if you experience:**\n• Sudden severe headache\n• Headache with fever and stiff neck\n• Vision changes\n• Confusion or difficulty speaking\n\nWould you like me to connect you with a neurologist or general practitioner?`;
      suggestions = ['Find a neurologist', 'Home remedies', 'When to see a doctor', 'Track symptoms'];
    }
    else if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      response = `Fever can indicate your body is fighting an infection. Here's what you should know:\n\n**Normal actions:**\n• Rest and stay hydrated\n• Monitor temperature regularly\n• Take fever reducers if needed (acetaminophen/ibuprofen)\n\n**Seek medical attention if:**\n• Temperature above 103°F (39.4°C)\n• Fever lasts more than 3 days\n• Difficulty breathing\n• Severe headache or stiff neck\n• Persistent vomiting\n\n**For children:** Lower thresholds apply. Contact pediatrician for guidance.\n\nWould you like me to help you find a doctor or provide more specific guidance?`;
      suggestions = ['Find a doctor', 'Fever in children', 'Home care tips', 'Emergency signs'];
    }
    else if (lowerMessage.includes('cough')) {
      response = `Coughs can have various causes. Let me help you understand:\n\n**Types of cough:**\n• **Dry cough:** Often from irritation or viral infection\n• **Productive cough:** With mucus, may indicate bacterial infection\n\n**Home remedies:**\n• Honey and warm water\n• Stay hydrated\n• Use humidifier\n• Avoid irritants\n\n**See a doctor if:**\n• Cough persists >3 weeks\n• Blood in mucus\n• High fever\n• Difficulty breathing\n• Chest pain\n\nWould you like me to connect you with a pulmonologist or general practitioner?`;
      suggestions = ['Find a lung specialist', 'Cough remedies', 'Is it serious?', 'Medication options'];
    }
    else if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      response = `⚠️ **IMPORTANT:** Chest pain can be serious and requires immediate attention.\n\n**Seek emergency care immediately if you have:**\n• Crushing chest pain\n• Pain radiating to arm, jaw, or back\n• Shortness of breath\n• Sweating or nausea\n• Dizziness or fainting\n\n**Other causes of chest pain:**\n• Muscle strain\n• Acid reflux\n• Anxiety\n• Respiratory infections\n\n**Do not delay:** If you're unsure, it's always better to seek immediate medical attention.\n\n🚨 **Call emergency services if symptoms are severe!**`;
      suggestions = ['Call emergency', 'Find cardiologist', 'Anxiety vs heart', 'Immediate steps'];
    }
    else if (lowerMessage.includes('find') && lowerMessage.includes('doctor')) {
      response = `I can help you find the right healthcare professional! Here are some options:\n\n**Available specialists:**\n🩺 General Practitioners\n❤️ Cardiologists\n🧠 Neurologists\n🫁 Pulmonologists\n🦴 Orthopedists\n👁️ Ophthalmologists\n🩸 Hematologists\n\n**What I need to know:**\n• Your location or preferred area\n• Type of specialist needed\n• Insurance preferences\n• Urgency level\n\nTell me more about what kind of doctor you're looking for!`;
      suggestions = ['General practitioner', 'Specialist needed', 'Emergency care', 'Telemedicine options'];
    }
    else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      response = `I can provide general information about medications, but always consult your doctor or pharmacist for specific advice.\n\n**What I can help with:**\n• General medication information\n• Common side effects\n• Drug interactions (basic)\n• When to take medications\n\n**Important reminders:**\n• Never stop prescribed medications without consulting your doctor\n• Always read medication labels\n• Report side effects to your healthcare provider\n• Keep medications in original containers\n\nWhat specific medication information do you need?`;
      suggestions = ['Drug interactions', 'Side effects', 'Dosage questions', 'Generic vs brand'];
    }
    else {
      response = `I'm here to help with your health questions! I can assist with:\n\n🔍 **Symptom analysis** - Describe what you're experiencing\n💊 **Medication information** - Ask about drugs and treatments\n🏥 **Doctor referrals** - Find the right specialist\n📋 **Health guidance** - Get personalized advice\n🚨 **Emergency guidance** - Know when to seek immediate care\n\nPlease describe your symptoms or health concerns in detail, and I'll provide the best guidance possible.\n\n*Remember: I provide information and guidance, but always consult healthcare professionals for diagnosis and treatment.*`;
      suggestions = ['Describe symptoms', 'Find a doctor', 'Medication help', 'Health tips'];
    }

    return {
      id: conversations.length + 2,
      type: 'bot' as const,
      message: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSearch(false);
  };

  const handleSearchSelect = (condition: string) => {
    setMessage(prev => prev + condition);
    setShowSearch(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Brain className="w-7 h-7 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">Smart Doci</span>
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <p className="text-sm opacity-90">AI-Powered Health Assistant</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white border-white/30">
                <Heart className="w-3 h-3 mr-1 animate-pulse" />
                24/7 Available
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Mic className="w-3 h-3 mr-1" />
                Voice Enabled
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Enhanced Chat Interface */}
      <Card className="h-[600px] flex flex-col shadow-xl border-2">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Smart Doci
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </h3>
                <p className="text-xs text-green-600 font-medium">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs bg-blue-50">
                <MessageCircle className="w-3 h-3 mr-1" />
                Symptom Analysis
              </Badge>
              <Badge variant="outline" className="text-xs bg-green-50">
                <Stethoscope className="w-3 h-3 mr-1" />
                Doctor Connect
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
          {conversations.map((conv) => (
            <div key={conv.id} className={`flex gap-3 ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {conv.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[75%] ${conv.type === 'user' ? 'order-2' : ''}`}>
                <div className={`p-4 rounded-2xl shadow-sm ${
                  conv.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto' 
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{conv.message}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">{conv.timestamp}</span>
                  {conv.type === 'bot' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => speakMessage(conv.message)}
                    >
                      {isSpeaking ? 
                        <VolumeX className="w-3 h-3 text-red-500" /> : 
                        <Volume2 className="w-3 h-3 text-gray-500" />
                      }
                    </Button>
                  )}
                </div>

                {conv.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {conv.suggestions.map((suggestion, idx) => (
                      <Button 
                        key={idx} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7 bg-blue-50 hover:bg-blue-100 border-blue-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {conv.type === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Enhanced Input */}
        <div className="p-4 border-t bg-white">
          {/* Search Results */}
          {showSearch && (
            <div className="mb-3 p-2 bg-gray-50 border rounded-lg max-h-32 overflow-y-auto">
              <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                <Search className="w-3 h-3" />
                Suggested conditions:
              </div>
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded text-sm flex items-center gap-2"
                  onClick={() => handleSearchSelect(result)}
                >
                  <Stethoscope className="w-3 h-3 text-blue-500" />
                  {result}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  searchConditions(e.target.value);
                }}
                placeholder="Describe your symptoms, ask about conditions, or request doctor recommendations..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pl-10 pr-12 py-3 text-sm border-2 focus:border-blue-500 rounded-xl"
              />
            </div>
            
            <Button
              size="sm"
              variant={isListening ? "destructive" : "outline"}
              className="px-3 py-3 rounded-xl"
              onClick={handleVoiceInput}
            >
              {isListening ? 
                <MicOff className="w-4 h-4 animate-pulse" /> : 
                <Mic className="w-4 h-4" />
              }
            </Button>
            
            <Button 
              onClick={handleSendMessage} 
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-500">
              Smart Doci provides health information. Always consult healthcare professionals for diagnosis.
            </p>
            {isListening && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                Listening...
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-200" 
              onClick={() => handleSuggestionClick("I need to find a doctor")}>
          <CardContent className="p-4 text-center">
            <Stethoscope className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">Find a Doctor</h4>
            <p className="text-xs text-gray-600">Connect with specialists</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-200"
              onClick={() => handleSuggestionClick("Analyze my symptoms")}>
          <CardContent className="p-4 text-center">
            <Search className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">Symptom Checker</h4>
            <p className="text-xs text-gray-600">Analyze your symptoms</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-purple-200"
              onClick={() => handleSuggestionClick("Tell me about medications")}>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">Medication Info</h4>
            <p className="text-xs text-gray-600">Drug information & interactions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}