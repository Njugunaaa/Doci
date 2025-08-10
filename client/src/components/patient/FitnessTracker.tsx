
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Heart, 
  Footprints, 
  Clock, 
  Flame,
  Plus,
  Edit
} from 'lucide-react';

export default function FitnessTracker() {
  const [goals, setGoals] = useState({
    steps: 10000,
    weight: 70,
    cardio: 30
  });

  const currentStats = {
    steps: 8547,
    weight: 72.5,
    cardio: 25,
    heartRate: 72,
    calories: 2150
  };

  const weeklyData = [
    { day: 'Mon', steps: 9200, cardio: 30 },
    { day: 'Tue', steps: 7800, cardio: 0 },
    { day: 'Wed', steps: 11200, cardio: 45 },
    { day: 'Thu', steps: 8900, cardio: 20 },
    { day: 'Fri', steps: 10500, cardio: 35 },
    { day: 'Sat', steps: 12000, cardio: 60 },
    { day: 'Sun', steps: 8547, cardio: 25 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Today's Steps</CardTitle>
            <Footprints className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.steps.toLocaleString()}</div>
            <Progress value={(currentStats.steps / goals.steps) * 100} className="mt-2 bg-blue-400" />
            <p className="text-xs opacity-90 mt-1">
              {Math.round((currentStats.steps / goals.steps) * 100)}% of goal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Weight</CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.weight} kg</div>
            <div className="text-xs opacity-90 mt-1">
              Goal: {goals.weight} kg ({currentStats.weight > goals.weight ? '+' : ''}{(currentStats.weight - goals.weight).toFixed(1)} kg)
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.heartRate} bpm</div>
            <Badge className="bg-white/20 text-white text-xs mt-1">Resting</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Calories</CardTitle>
            <Flame className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.calories}</div>
            <p className="text-xs opacity-90 mt-1">Burned today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Setting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Fitness Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stepsGoal">Daily Steps Goal</Label>
              <div className="flex gap-2">
                <Input
                  id="stepsGoal"
                  type="number"
                  value={goals.steps}
                  onChange={(e) => setGoals(prev => ({ ...prev, steps: parseInt(e.target.value) || 0 }))}
                  className="flex-1"
                />
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={(currentStats.steps / goals.steps) * 100} className="mt-2" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightGoal">Target Weight (kg)</Label>
              <div className="flex gap-2">
                <Input
                  id="weightGoal"
                  type="number"
                  value={goals.weight}
                  onChange={(e) => setGoals(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  className="flex-1"
                  step="0.1"
                />
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardioGoal">Daily Cardio (minutes)</Label>
              <div className="flex gap-2">
                <Input
                  id="cardioGoal"
                  type="number"
                  value={goals.cardio}
                  onChange={(e) => setGoals(prev => ({ ...prev, cardio: parseInt(e.target.value) || 0 }))}
                  className="flex-1"
                />
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <Progress value={(currentStats.cardio / goals.cardio) * 100} className="mt-2" />
            </div>

            <Button className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{day.steps.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{day.cardio}min</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Today's Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Footprints className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Morning Walk</h4>
                  <p className="text-sm text-gray-600">3,200 steps • 25 minutes</p>
                </div>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Cardio Workout</h4>
                  <p className="text-sm text-gray-600">25 minutes • 180 calories</p>
                </div>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium">Evening Yoga</h4>
                  <p className="text-sm text-gray-600">30 minutes • Planned</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>

          <Button className="w-full mt-4" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Log New Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
