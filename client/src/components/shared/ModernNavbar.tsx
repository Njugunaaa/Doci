import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Heart, 
  Bell, 
  Search, 
  Menu,
  X,
  Home,
  Stethoscope,
  Users,
  Shield,
  Activity,
  Calendar,
  MessageCircle,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';

interface ModernNavbarProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function ModernNavbar({ 
  title = "Doci's Health Platform", 
  subtitle = "Professional Healthcare Management",
  showSearch = true,
  showNotifications = true 
}: ModernNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [, setLocation] = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  const navigationItems = [
    { name: 'Dashboard', icon: Home, href: '/', active: false },
    { name: 'Doctors', icon: Stethoscope, href: '/doctors', active: false },
    { name: 'Patients', icon: Users, href: '/patients', active: false },
    { name: 'Analytics', icon: Activity, href: '/analytics', active: false },
    { name: 'Calendar', icon: Calendar, href: '/calendar', active: false },
    { name: 'Messages', icon: MessageCircle, href: '/messages', active: false, badge: 3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white animate-pulse-medical" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className="relative h-9"
                  onClick={() => setLocation(item.href)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                  {item.badge && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {showSearch && (
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search patients, doctors, appointments..."
                  className="pl-10 pr-4 py-2 w-80 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            )}

            {/* Notifications */}
            {showNotifications && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs text-destructive-foreground font-bold">3</span>
                </div>
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Link */}
            {user?.email === 'joshuangich2@gmail.com' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/.admin'}
                className="hidden md:flex"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                <AvatarImage src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.fullName || 'User'}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.userType === 'admin' ? 'Administrator' : user?.userType || 'User'}
                </p>
              </div>

              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t animate-slide-up-medical">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className="justify-start relative"
                  onClick={() => {
                    setLocation(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                  {item.badge && (
                    <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
              
              {/* Mobile Search */}
              {showSearch && (
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}