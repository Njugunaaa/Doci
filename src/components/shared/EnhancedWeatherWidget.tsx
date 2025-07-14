import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye,
  Thermometer,
  Sunrise,
  Sunset
} from 'lucide-react';

export default function EnhancedWeatherWidget() {
  const [weather, setWeather] = useState({
    current: {
      temp: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      uvIndex: 6,
      feelsLike: 26,
      icon: 'partly-cloudy'
    },
    hourly: [
      { time: '12 PM', temp: 24, icon: 'partly-cloudy' },
      { time: '1 PM', temp: 25, icon: 'sunny' },
      { time: '2 PM', temp: 26, icon: 'sunny' },
      { time: '3 PM', temp: 25, icon: 'cloudy' },
      { time: '4 PM', temp: 23, icon: 'rainy' }
    ],
    forecast: [
      { day: 'Today', high: 26, low: 18, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
      { day: 'Tomorrow', high: 28, low: 20, condition: 'Sunny', icon: 'sunny' },
      { day: 'Wednesday', high: 24, low: 16, condition: 'Rainy', icon: 'rainy' }
    ]
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = (condition: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };

    const iconClass = `${sizeClasses[size]} ${isAnimating ? 'animate-bounce' : ''}`;

    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'partly-cloudy':
        return <Cloud className={`${iconClass} text-gray-500`} />;
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-600`} />;
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />;
    }
  };

  const getHealthTip = () => {
    const temp = weather.current.temp;
    const condition = weather.current.condition.toLowerCase();
    
    if (temp > 25 && condition.includes('sunny')) {
      return {
        icon: '☀️',
        message: 'Perfect weather for outdoor activities! Stay hydrated and wear sunscreen.',
        color: 'text-orange-600 bg-orange-50'
      };
    } else if (condition.includes('rainy')) {
      return {
        icon: '🌧️',
        message: 'Rainy day ahead. Great time for indoor workouts or meditation.',
        color: 'text-blue-600 bg-blue-50'
      };
    } else if (temp < 15) {
      return {
        icon: '🧥',
        message: 'Cool weather - dress warmly and consider indoor exercises.',
        color: 'text-purple-600 bg-purple-50'
      };
    } else {
      return {
        icon: '🚶',
        message: 'Great weather for a walk! Aim for 30 minutes of outdoor activity.',
        color: 'text-green-600 bg-green-50'
      };
    }
  };

  const healthTip = getHealthTip();

  return (
    <Card className="h-fit shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getWeatherIcon(weather.current.condition, 'md')}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Weather Today
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="text-center">
          <div className="relative">
            {getWeatherIcon(weather.current.condition, 'lg')}
            <div className="text-4xl font-bold text-gray-900 mb-1 mt-2">
              {weather.current.temp}°C
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Feels like {weather.current.feelsLike}°C
            </div>
          </div>
          <Badge variant="outline" className="mb-3">
            {weather.current.condition}
          </Badge>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <div className="font-medium">{weather.current.humidity}%</div>
              <div className="text-xs text-gray-600">Humidity</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <Wind className="w-4 h-4 text-gray-500" />
            <div>
              <div className="font-medium">{weather.current.windSpeed} km/h</div>
              <div className="text-xs text-gray-600">Wind</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Eye className="w-4 h-4 text-green-500" />
            <div>
              <div className="font-medium">{weather.current.visibility} km</div>
              <div className="text-xs text-gray-600">Visibility</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
            <Sun className="w-4 h-4 text-orange-500" />
            <div>
              <div className="font-medium">UV {weather.current.uvIndex}</div>
              <div className="text-xs text-gray-600">UV Index</div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="pt-3 border-t">
          <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            Hourly Forecast
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {weather.hourly.map((hour, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px] p-2 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-600 mb-1">{hour.time}</span>
                {getWeatherIcon(hour.icon, 'sm')}
                <span className="text-sm font-medium mt-1">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="pt-3 border-t">
          <h4 className="font-medium mb-3 text-sm">3-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.icon, 'sm')}
                  <div>
                    <span className="text-sm font-medium">{day.day}</span>
                    <div className="text-xs text-gray-600">{day.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">{day.high}°</span>
                  <span className="text-sm text-gray-500">/{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tip */}
        <div className={`p-3 rounded-lg border-l-4 ${healthTip.color}`}>
          <div className="flex items-start gap-2">
            <span className="text-lg">{healthTip.icon}</span>
            <p className="text-xs font-medium">{healthTip.message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}