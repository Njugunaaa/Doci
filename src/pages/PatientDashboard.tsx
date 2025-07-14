
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Activity, 
  Apple, 
  Cloud, 
  ShoppingCart, 
  Users, 
  Crown, 
  MessageCircle,
  Heart,
  Target,
  Calendar,
  TrendingUp
} from 'lucide-react';
import SmartDocChat from '@/components/patient/SmartDocChat';
import FitnessTracker from '@/components/patient/FitnessTracker';
import NutritionPlanner from '@/components/patient/NutritionPlanner';
import WeatherWidget from '@/components/shared/WeatherWidget';
import PharmacyShop from '@/components/patient/PharmacyShop';
import CommunityGroups from '@/components/patient/CommunityGroups';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-sm text-gray-600">Let's take care of your health today</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Upgrade to Doci Plus
              </Badge>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="smartdoc" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Smart Doc</span>
            </TabsTrigger>
            <TabsTrigger value="fitness" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Fitness</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="pharmacy" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Pharmacy</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Premium</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Steps</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,547</div>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <Heart className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Excellent health</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weight Goal</CardTitle>
                  <Target className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-2.5kg</div>
                  <p className="text-xs text-muted-foreground">3.5kg remaining</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mar 15</div>
                  <p className="text-xs text-muted-foreground">Dr. Smith - Checkup</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Recent Smart Doc Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Headache and fatigue</p>
                        <p className="text-xs text-gray-600">Suggested: Stay hydrated, rest well</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-green-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Diet plan for weight loss</p>
                        <p className="text-xs text-gray-600">Generated personalized meal plan</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <WeatherWidget />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="smartdoc">
            <SmartDocChat />
          </TabsContent>

          <TabsContent value="fitness">
            <FitnessTracker />
          </TabsContent>

          <TabsContent value="nutrition">
            <NutritionPlanner />
          </TabsContent>

          <TabsContent value="pharmacy">
            <PharmacyShop />
          </TabsContent>

          <TabsContent value="community">
            <CommunityGroups />
          </TabsContent>

          <TabsContent value="premium">
            <Card className="text-center py-12">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Upgrade to Doci Plus</CardTitle>
                <CardDescription>
                  Unlock premium features for the ultimate health experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">24/7 Doctor Access</h4>
                    <p className="text-sm text-gray-600">Connect with verified doctors anytime</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Priority Support</h4>
                    <p className="text-sm text-gray-600">Get faster responses and premium care</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Advanced AI Reports</h4>
                    <p className="text-sm text-gray-600">Detailed health insights and analysis</p>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Upgrade Now - $9.99/month
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
