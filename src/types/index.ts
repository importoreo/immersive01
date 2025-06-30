export interface ExperienceData {
  id: string;
  title: string;
  type: 'visual-story' | 'interactive-world' | 'ai-character';
  thumbnail: string;
  playCount: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
  description?: string;
  tags?: string[];
  isPublished?: boolean;
  revenue?: number;
  creator: string;
  creatorAvatar: string;
  duration: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  userAnalytics: {
    ageGroups: { age: string; percentage: number }[];
    demographics: { region: string; percentage: number }[];
    engagementTime: number;
    completionRate: number;
  };
}

export interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  experiences: number;
  interests: string[];
  joinedDate: string;
}

export interface ChatData {
  id: string;
  name: string;
  type: 'private' | 'experience-group';
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  experienceTitle?: string;
  isOwner?: boolean;
}

export type PageType = 'home' | 'create' | 'discover' | 'chat' | 'profile'; 