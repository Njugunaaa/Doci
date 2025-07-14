import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Search, 
  Plus, 
  X, 
  Activity, 
  Scale, 
  Thermometer,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface HealthQuestionnaireProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: any) => void;
}

export default function HealthQuestionnaire({ open, onOpenChange, onComplete }: HealthQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    // Basic Info
    age: '',
    gender: '',
    height: '',
    weight: '',
    
    // Health Metrics
    bloodPressure: {
      systolic: '',
      diastolic: ''
    },
    heartRate: '',
    bloodSugar: '',
    
    // Medical History
    conditions: [] as string[],
    medications: [] as string[],
    allergies: [] as string[],
    surgeries: [] as string[],
    
    // Lifestyle
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    sleepHours: '',
    
    // Symptoms & Concerns
    currentSymptoms: [] as string[],
    healthConcerns: '',
    familyHistory: [] as string[]
  });

  const commonConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis',
    'Depression', 'Anxiety', 'High Cholesterol', 'Thyroid Disorder',
    'Kidney Disease', 'Liver Disease', 'Cancer', 'Stroke', 'COPD',
    'Osteoporosis', 'Migraine', 'Epilepsy', 'Autoimmune Disease'
  ];

  const commonSymptoms = [
    'Headache', 'Fatigue', 'Chest Pain', 'Shortness of Breath',
    'Dizziness', 'Nausea', 'Back Pain', 'Joint Pain', 'Insomnia',
    'Weight Loss', 'Weight Gain', 'Fever', 'Cough', 'Skin Rash'
  ];

  const commonMedications = [
    'Aspirin', 'Metformin', 'Lisinopril', 'Atorvastatin', 'Omeprazole',
    'Levothyroxine', 'Amlodipine', 'Metoprolol', 'Losartan', 'Gabapentin'
  ];

  const filteredConditions = commonConditions.filter(condition =>
    condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToList = (item: string, listKey: string) => {
    setFormData(prev => ({
      ...prev,
      [listKey]: [...prev[listKey as keyof typeof prev] as string[], item]
    }));
    setSearchTerm('');
  };

  const removeFromList = (item: string, listKey: string) => {
    setFormData(prev => ({
      ...prev,
      [listKey]: (prev[listKey as keyof typeof prev] as string[]).filter(i => i !== item)
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save health profile data
    console.log('Health Profile Data:', formData);
    toast.success('Health profile created successfully!');
    onComplete(formData);
    onOpenChange(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <p className="text-gray-600">Let's start with some basic details about you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in cm"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Health Metrics</h3>
              <p className="text-gray-600">Current health measurements (if known)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Blood Pressure</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Systolic"
                    value={formData.bloodPressure.systolic}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, systolic: e.target.value }
                    }))}
                  />
                  <span className="flex items-center">/</span>
                  <Input
                    placeholder="Diastolic"
                    value={formData.bloodPressure.diastolic}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, diastolic: e.target.value }
                    }))}
                  />
                </div>
                <p className="text-xs text-gray-500">Example: 120/80 mmHg</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heartRate">Resting Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="e.g., 72"
                  value={formData.heartRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, heartRate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodSugar">Blood Sugar Level (mg/dL)</Label>
                <Input
                  id="bloodSugar"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.bloodSugar}
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodSugar: e.target.value }))}
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Don't worry if you don't know these values. You can skip them and add them later.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Medical History</h3>
              <p className="text-gray-600">Tell us about your medical background</p>
            </div>

            {/* Medical Conditions */}
            <div className="space-y-3">
              <Label>Do you have any medical conditions?</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conditions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {searchTerm && (
                <div className="border rounded-lg p-2 max-h-32 overflow-y-auto">
                  {filteredConditions.map((condition) => (
                    <div
                      key={condition}
                      className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                      onClick={() => addToList(condition, 'conditions')}
                    >
                      {condition}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {formData.conditions.map((condition) => (
                  <Badge key={condition} variant="outline" className="flex items-center gap-1">
                    {condition}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeFromList(condition, 'conditions')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="space-y-3">
              <Label>Current Medications</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medications..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      addToList(e.currentTarget.value, 'medications');
                      e.currentTarget.value = '';
                    }
                  }}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.medications.map((medication) => (
                  <Badge key={medication} variant="outline" className="flex items-center gap-1">
                    {medication}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeFromList(medication, 'medications')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-3">
              <Label>Allergies</Label>
              <Input
                placeholder="Enter allergies (press Enter to add)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    addToList(e.currentTarget.value, 'allergies');
                    e.currentTarget.value = '';
                  }
                }}
              />
              
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy) => (
                  <Badge key={allergy} variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700">
                    <AlertCircle className="w-3 h-3" />
                    {allergy}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeFromList(allergy, 'allergies')}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Current Health & Lifestyle</h3>
              <p className="text-gray-600">Help us understand your current situation</p>
            </div>

            {/* Current Symptoms */}
            <div className="space-y-3">
              <Label>Are you experiencing any symptoms?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={formData.currentSymptoms.includes(symptom)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToList(symptom, 'currentSymptoms');
                        } else {
                          removeFromList(symptom, 'currentSymptoms');
                        }
                      }}
                    />
                    <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Smoking Status</Label>
                <Select value={formData.smokingStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, smokingStatus: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="current">Current smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Exercise Frequency</Label>
                <Select value={formData.exerciseFrequency} onValueChange={(value) => setFormData(prev => ({ ...prev, exerciseFrequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No exercise</SelectItem>
                    <SelectItem value="light">1-2 times per week</SelectItem>
                    <SelectItem value="moderate">3-4 times per week</SelectItem>
                    <SelectItem value="active">5+ times per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sleep Hours (per night)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 7"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Alcohol Consumption</Label>
                <Select value={formData.alcoholConsumption} onValueChange={(value) => setFormData(prev => ({ ...prev, alcoholConsumption: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Never</SelectItem>
                    <SelectItem value="occasional">Occasionally</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="frequent">Frequently</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Health Concerns */}
            <div className="space-y-2">
              <Label htmlFor="healthConcerns">Any specific health concerns or goals?</Label>
              <Textarea
                id="healthConcerns"
                placeholder="Tell us about any health concerns, goals, or questions you have..."
                value={formData.healthConcerns}
                onChange={(e) => setFormData(prev => ({ ...prev, healthConcerns: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Complete Your Health Profile
          </DialogTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Step {step} of 4
          </p>
        </DialogHeader>
        
        <div className="mt-6">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)}
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </Button>
          
          <Button onClick={handleNext}>
            {step < 4 ? 'Next' : 'Complete Profile'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}