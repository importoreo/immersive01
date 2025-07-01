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

// Create Experience Types
export interface ConceptData {
  type: 'prompt' | 'template' | 'link' | 'upload';
  content: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  popular?: boolean;
}

export interface PillarOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  recommended?: boolean;
}

export interface PillarsData {
  theme: string;
  genre: string;
  artStyle: string;
  framework: string;
}

export interface ExperienceStyleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  previewImage: string;
  recommended?: boolean;
}

export interface ParametersData {
  experienceStyle: string;
  difficulty: number;
  nsfwEnabled: boolean;
}

export interface UserAccount {
  gems: number;
  hasCreatorSubscription: boolean;
  subscriptionExpiry?: string;
}

export interface CustomFoundationConfig {
  characterPortraits: number;
  environmentArt: number;
  audioTracks: number;
  storyBeats: number;
  interactiveElements: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  gems: number;
  emoji: string;
  popular?: boolean;
}

export interface OneTimePack {
  id: string;
  name: string;
  price: string;
  gems: number;
  bonus?: boolean;
} 