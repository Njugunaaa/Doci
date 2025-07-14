
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Plus, 
  Search,
  ThumbsUp,
  Reply,
  Calendar,
  Star
} from 'lucide-react';

export default function CommunityGroups() {
  const [newPost, setNewPost] = useState('');

  const groups = [
    {
      id: 1,
      name: 'Diabetes Warriors',
      members: 1234,
      description: 'Support group for people managing diabetes',
      category: 'Chronic Conditions',
      isJoined: true,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mental Health Circle',
      members: 856,
      description: 'A safe space to discuss mental health and wellness',
      category: 'Mental Health',
      isJoined: true,
      lastActivity: '30 minutes ago'
    },
    {
      id: 3,
      name: 'Weight Loss Journey',
      members: 2156,
      description: 'Share tips and motivation for healthy weight management',
      category: 'Fitness & Nutrition',
      isJoined: false,
      lastActivity: '1 hour ago'
    },
    {
      id: 4,
      name: 'Heart Health Support',
      members: 678,
      description: 'Community for cardiovascular health awareness',
      category: 'Heart Health',
      isJoined: false,
      lastActivity: '4 hours ago'
    }
  ];

  const posts = [
    {
      id: 1,
      author: 'Sarah M.',
      group: 'Diabetes Warriors',
      time: '2 hours ago',
      content: 'Just wanted to share that I\'ve successfully maintained my blood sugar levels for 3 months now! The tips from this community have been incredibly helpful. Thank you all! 🎉',
      likes: 24,
      replies: 8,
      isLiked: false,
      avatar: 'SM'
    },
    {
      id: 2,
      author: 'Mike Johnson',
      group: 'Mental Health Circle',
      time: '4 hours ago',
      content: 'Having a tough day today. Work stress is getting to me. Any quick mindfulness techniques you all recommend?',
      likes: 12,
      replies: 15,
      isLiked: true,
      avatar: 'MJ'
    },
    {
      id: 3,
      author: 'Emma Davis',
      group: 'Weight Loss Journey',
      time: '6 hours ago',
      content: 'Week 8 update: Down 12 pounds! 💪 Consistency really is key. Here\'s my weekly meal prep routine...',
      likes: 45,
      replies: 22,
      isLiked: false,
      avatar: 'ED'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Diabetes Management Webinar',
      group: 'Diabetes Warriors',
      date: 'March 20, 2024',
      time: '7:00 PM',
      attendees: 89
    },
    {
      id: 2,
      title: 'Group Meditation Session',
      group: 'Mental Health Circle',
      date: 'March 18, 2024',
      time: '6:00 PM',
      attendees: 23
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Share with Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  placeholder="Share your experience, ask a question, or offer support..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-between items-center">
                  <select className="text-sm border rounded px-3 py-1">
                    <option>Post to: Diabetes Warriors</option>
                    <option>Post to: Mental Health Circle</option>
                  </select>
                  <Button>Post</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-blue-600">{post.avatar}</span>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{post.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.group}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                      </div>
                      
                      <div className="flex items-center gap-6 pt-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center gap-2 ${post.isLiked ? 'text-red-600' : 'text-gray-600'}`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                          <Reply className="w-4 h-4" />
                          {post.replies}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.filter(group => group.isJoined).map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {group.members.toLocaleString()}
                      </span>
                      <span>Active {group.lastActivity}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      View Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for health communities..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Available Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.filter(group => !group.isJoined).map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {group.members.toLocaleString()}
                      </span>
                      <span>Active {group.lastActivity}</span>
                    </div>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create New Group */}
          <Card className="border-dashed border-2">
            <CardContent className="pt-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Create a New Community</h3>
                  <p className="text-sm text-gray-600">Start your own support group</p>
                </div>
                <Button>Create Group</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {event.group}
                        </Badge>
                      </div>
                      <Button size="sm">RSVP</Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Event */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <Badge>Featured Event</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Global Health Awareness Week</h3>
              <p className="text-gray-600 mb-4">
                Join health communities worldwide for a week of workshops, discussions, and support sessions.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>March 25-31, 2024</span>
                <span>Online & Local Events</span>
                <span>Free Participation</span>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Register Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
