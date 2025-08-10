
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Apple, 
  Target, 
  TrendingUp, 
  Utensils, 
  Calculator,
  MessageCircle,
  ChefHat,
  Heart,
  Scale
} from 'lucide-react';

export default function NutritionPlanner() {
  const [userStats, setUserStats] = useState({
    weight: 72.5,
    height: 175,
    age: 28,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'weight_loss'
  });

  const nutritionGoals = {
    calories: 2200,
    protein: 110,
    carbs: 275,
    fats: 73,
    fiber: 25,
    water: 2500
  };

  const todayIntake = {
    calories: 1850,
    protein: 85,
    carbs: 220,
    fats: 62,
    fiber: 18,
    water: 1800
  };

  const mealPlan = [
    {
      meal: 'Breakfast',
      time: '7:00 AM',
      foods: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'],
      calories: 450,
      status: 'completed'
    },
    {
      meal: 'Mid-Morning Snack',
      time: '10:00 AM',
      foods: ['Apple with almond butter'],
      calories: 200,
      status: 'completed'
    },
    {
      meal: 'Lunch',
      time: '1:00 PM',
      foods: ['Grilled chicken salad', 'Quinoa', 'Olive oil dressing'],
      calories: 600,
      status: 'completed'
    },
    {
      meal: 'Afternoon Snack',
      time: '4:00 PM',
      foods: ['Mixed nuts', 'Herbal tea'],
      calories: 180,
      status: 'pending'
    },
    {
      meal: 'Dinner',
      time: '7:00 PM',
      foods: ['Baked salmon', 'Steamed vegetables', 'Brown rice'],
      calories: 550,
      status: 'pending'
    }
  ];

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (userStats.gender === 'male') {
      return (10 * userStats.weight) + (6.25 * userStats.height) - (5 * userStats.age) + 5;
    } else {
      return (10 * userStats.weight) + (6.25 * userStats.height) - (5 * userStats.age) - 161;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="calculator">BMR Calculator</TabsTrigger>
          <TabsTrigger value="nutritionist">Nutritionist</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Calories</CardTitle>
                <Utensils className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayIntake.calories}</div>
                <Progress 
                  value={(todayIntake.calories / nutritionGoals.calories) * 100} 
                  className="mt-2 bg-green-400" 
                />
                <p className="text-xs opacity-90 mt-1">
                  {nutritionGoals.calories - todayIntake.calories} left
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Protein</CardTitle>
                <Target className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayIntake.protein}g</div>
                <Progress 
                  value={(todayIntake.protein / nutritionGoals.protein) * 100} 
                  className="mt-2 bg-blue-400" 
                />
                <p className="text-xs opacity-90 mt-1">
                  {Math.round((todayIntake.protein / nutritionGoals.protein) * 100)}% of goal
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Water</CardTitle>
                <Target className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(todayIntake.water / 1000).toFixed(1)}L</div>
                <Progress 
                  value={(todayIntake.water / nutritionGoals.water) * 100} 
                  className="mt-2 bg-purple-400" 
                />
                <p className="text-xs opacity-90 mt-1">
                  {((nutritionGoals.water - todayIntake.water) / 1000).toFixed(1)}L remaining
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Macronutrients Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Macronutrients Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Carbohydrates</span>
                    <span className="text-sm text-gray-600">{todayIntake.carbs}g / {nutritionGoals.carbs}g</span>
                  </div>
                  <Progress value={(todayIntake.carbs / nutritionGoals.carbs) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">50% of calories</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Protein</span>
                    <span className="text-sm text-gray-600">{todayIntake.protein}g / {nutritionGoals.protein}g</span>
                  </div>
                  <Progress value={(todayIntake.protein / nutritionGoals.protein) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">20% of calories</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fats</span>
                    <span className="text-sm text-gray-600">{todayIntake.fats}g / {nutritionGoals.fats}g</span>
                  </div>
                  <Progress value={(todayIntake.fats / nutritionGoals.fats) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">30% of calories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Nutrition Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-red-600" />
                AI Nutrition Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <h4 className="font-semibold text-green-700 mb-2">Great Progress! 🎉</h4>
                <p className="text-sm text-green-600">
                  You're doing well with your protein intake today. Consider adding more fiber-rich vegetables to reach your daily fiber goal.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-700 mb-2">Hydration Reminder 💧</h4>
                <p className="text-sm text-blue-600">
                  You need {((nutritionGoals.water - todayIntake.water) / 250)} more glasses of water to reach your daily goal.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                <h4 className="font-semibold text-orange-700 mb-2">Meal Timing Tip ⏰</h4>
                <p className="text-sm text-orange-600">
                  Try to have your dinner 2-3 hours before bedtime for better digestion and sleep quality.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meal-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-orange-600" />
                  Today's Meal Plan
                </div>
                <Button variant="outline" size="sm">
                  Generate New Plan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlan.map((meal, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    meal.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{meal.meal}</h4>
                        <p className="text-sm text-gray-600">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={meal.status === 'completed' ? 'default' : 'secondary'}>
                          {meal.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{meal.calories} cal</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {meal.foods.map((food, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                BMR & Calorie Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={userStats.weight}
                    onChange={(e) => setUserStats(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={userStats.height}
                    onChange={(e) => setUserStats(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userStats.age}
                    onChange={(e) => setUserStats(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={userStats.gender}
                    onChange={(e) => setUserStats(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Your Results
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">BMR (Basal Metabolic Rate)</p>
                    <p className="text-lg font-bold text-blue-600">{Math.round(calculateBMR())} cal/day</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Maintenance Calories</p>
                    <p className="text-lg font-bold text-green-600">{Math.round(calculateBMR() * 1.6)} cal/day</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Weight Loss Goal</p>
                    <p className="text-lg font-bold text-red-600">{Math.round(calculateBMR() * 1.4)} cal/day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutritionist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Connect with a Nutritionist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Dr. Emma Rodriguez</h4>
                    <p className="text-sm text-gray-600">Registered Dietitian</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                      <span className="text-xs text-gray-500">• 4.9 ★</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Chat</Button>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Apple className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Dr. James Kim</h4>
                    <p className="text-sm text-gray-600">Sports Nutritionist</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Busy</span>
                      <span className="text-xs text-gray-500">• 4.8 ★</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Chat</Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <h4 className="font-semibold mb-2">Get Personalized Nutrition Advice</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Chat with certified nutritionists to get personalized meal plans, dietary advice, and answers to your nutrition questions.
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Start Consultation - $29.99
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
