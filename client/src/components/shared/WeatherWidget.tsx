
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState({
    current: {
      temp: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: 'partly-cloudy'
    },
    tomorrow: {
      temp: 26,
      condition: 'Sunny',
      icon: 'sunny'
    }
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  // Simulate weather API call
  useEffect(() => {
    // In a real app, you would call OpenWeather API here
    console.log('Weather data loaded');
  }, []);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getWeatherIcon(weather.current.condition)}
          Weather Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {weather.current.temp}°C
          </div>
          <Badge variant="outline" className="mb-3">
            {weather.current.condition}
          </Badge>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>{weather.current.humidity}% humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <span>{weather.current.windSpeed} km/h</span>
          </div>
        </div>

        {/* Tomorrow's Forecast */}
        <div className="pt-3 border-t">
          <h4 className="font-medium mb-2 text-sm">Tomorrow</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getWeatherIcon(weather.tomorrow.condition)}
              <span className="text-sm">{weather.tomorrow.condition}</span>
            </div>
            <span className="font-semibold">{weather.tomorrow.temp}°C</span>
          </div>
        </div>

        {/* Health Tip */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Perfect weather for outdoor activities! Consider a 30-minute walk to boost your daily steps.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
