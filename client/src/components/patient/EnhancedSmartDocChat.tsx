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

interface ConversationMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  suggestions?: string[];
  isTyping?: boolean;
}

export default function EnhancedSmartDocChat() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [conversations, setConversations] = useState<ConversationMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m Smart Doci, your AI health assistant powered by advanced medical AI. I can help you with:\n\n🔍 **Symptom Analysis** - Describe your symptoms for personalized guidance\n💊 **Medication Info** - Ask about medications and treatments\n🏥 **Doctor Connections** - Find specialists in your area\n📋 **Health Tips** - Get evidence-based health advice\n\nHow can I help you today?',
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

    // Show typing indicator
    const typingMessage = {
      id: conversations.length + 2,
      type: 'bot' as const,
      message: '🤔 Analyzing your question...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    };
    
    setConversations(prev => [...prev, typingMessage]);

    try {
      // Simulate AI response (would be replaced with actual AI service)
      const aiResponseText = await getSimulatedHealthAdvice(currentMessage);
      
      // Remove typing indicator and add real response
      setConversations(prev => prev.filter(conv => !conv.isTyping));
      
      const aiResponse = {
        id: conversations.length + 3,
        type: 'bot' as const,
        message: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: generateSuggestions(currentMessage)
      };
      setConversations(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove typing indicator and show error message
      setConversations(prev => prev.filter(conv => !conv.isTyping));
      
      const errorResponse = {
        id: conversations.length + 3,
        type: 'bot' as const,
        message: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment, or consider speaking with a healthcare professional if your concern is urgent.\n\n⚠ This is AI-generated advice and is not a substitute for professional medical consultation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['Try again', 'Find a doctor', 'Emergency contacts']
      };
      
      setConversations(prev => [...prev, errorResponse]);
      toast.error('Failed to get AI response. Please try again.');
    }
  };

  // Simple AI simulation for health advice
  const getSimulatedHealthAdvice = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return '🩺 **Headache Analysis**\n\nHeadaches can have various causes including stress, dehydration, lack of sleep, or eye strain. Here are some recommendations:\n\n• **Immediate relief**: Rest in a quiet, dark room\n• **Hydration**: Drink plenty of water\n• **Pain relief**: Consider over-the-counter pain relievers (follow package instructions)\n• **Prevention**: Maintain regular sleep schedule, manage stress\n\n⚠️ **See a doctor if**: Severe sudden headache, fever, vision changes, or persistent symptoms.\n\n*This is AI-generated advice and not a substitute for professional medical consultation.*';
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return '🌡️ **Fever Management**\n\nFever is often your body\'s natural response to infection. Here\'s what you should know:\n\n• **Normal response**: Fever helps fight infections\n• **Comfort measures**: Rest, fluids, light clothing\n• **Medication**: Acetaminophen or ibuprofen can help reduce fever\n• **Monitor**: Check temperature regularly\n\n🚨 **Seek immediate care if**: Temperature >103°F (39.4°C), difficulty breathing, severe symptoms, or concerning changes.\n\n*Always consult healthcare professionals for proper diagnosis and treatment.*';
    }
    
    if (lowerMessage.includes('cough')) {
      return '🫁 **Cough Assessment**\n\nCoughs can be dry or productive and may indicate various conditions:\n\n• **Hydration**: Drink warm liquids like tea with honey\n• **Humidity**: Use a humidifier or steam from hot shower\n• **Rest**: Avoid irritants like smoke\n• **Monitor**: Note if cough produces mucus or blood\n\n⚠️ **Contact a doctor if**: Cough persists >2 weeks, blood in mucus, difficulty breathing, or high fever.\n\n*This guidance is for general information only. Professional medical advice is recommended.*';
    }
    
    // Default response for other queries
    return `🤖 **Health Guidance**\n\nThank you for your question about "${userMessage}". While I can provide general health information, I recommend:\n\n• **Professional consultation**: Speak with a healthcare provider for personalized advice\n• **Reliable sources**: Use trusted medical websites for research\n• **Emergency care**: Call emergency services for urgent symptoms\n• **Preventive care**: Maintain regular check-ups with your doctor\n\n💡 **Helpful tips**: Stay hydrated, get adequate sleep, exercise regularly, and maintain a balanced diet.\n\n*This AI assistant provides general information only and cannot replace professional medical advice.*`;
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
      return ['Find a neurologist', 'Home remedies', 'When to see a doctor', 'Track symptoms'];
    }
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return ['Find a doctor', 'Fever in children', 'Home care tips', 'Emergency signs'];
    }
    if (lowerMessage.includes('cough')) {
      return ['Find a lung specialist', 'Cough remedies', 'Is it serious?', 'Medication options'];
    }
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      return ['Call emergency', 'Find cardiologist', 'Anxiety vs heart', 'Immediate steps'];
    }
    if (lowerMessage.includes('find') && lowerMessage.includes('doctor')) {
      return ['General practitioner', 'Specialist needed', 'Emergency care', 'Telemedicine options'];
    }
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return ['Drug interactions', 'Side effects', 'Dosage questions', 'Generic vs brand'];
    }

    return ['Describe symptoms', 'Find a doctor', 'Medication help', 'Health tips'];
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
                <div className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 ${
                  conv.isTyping ? 'animate-pulse' : ''
                }`}>
                  <Bot className={`w-5 h-5 text-white ${conv.isTyping ? 'animate-bounce' : ''}`} />
                </div>
              )}
              
              <div className={`max-w-[75%] ${conv.type === 'user' ? 'order-2' : ''}`}>
                <div className={`p-4 rounded-2xl shadow-sm ${conv.isTyping ? 'animate-pulse' : ''} ${
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
                    {conv.suggestions.map((suggestion: string, idx: number) => (
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
};