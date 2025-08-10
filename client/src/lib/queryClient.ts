import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Default fetcher function (demo mode for static deployment)
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  // For static deployment, return mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (url.includes('/api/communities')) {
    return [
      {
        id: 1,
        name: 'Heart Health Support',
        description: 'Community for heart health discussions',
        category: 'Cardiology',
        memberCount: 245
      },
      {
        id: 2,
        name: 'Mental Wellness',
        description: 'Support group for mental health',
        category: 'Psychology',
        memberCount: 189
      }
    ];
  }
  
  return { message: 'Demo mode - API not available in static deployment' };
};