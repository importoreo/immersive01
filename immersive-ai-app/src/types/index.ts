// 기본 타입들
export type ExperienceType = 'visual-story' | 'interactive-world' | 'ai-character';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ConceptType = 'prompt' | 'template' | 'link' | 'upload';
export type ChatType = 'private' | 'experience-group';
export type PageType = 'home' | 'create' | 'discover' | 'chat' | 'profile';
export type SettingsTab = 'profile' | 'analytics' | 'monetization';

// 사용자 계정 정보
export interface UserAccount {
  gems: number;
  hasCreatorSubscription: boolean;
  subscriptionExpiry?: string;
}

// 사용자 프로필
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

// 경험 데이터
export interface ExperienceData {
  id: string;
  title: string;
  type: ExperienceType;
  thumbnail: string;
  playCount: number;
  rating: number;
  difficulty: Difficulty;
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
    ageGroups: Array<{ age: string; percentage: number }>;
    demographics: Array<{ region: string; percentage: number }>;
    engagementTime: number;
    completionRate: number;
  };
}

// 컨셉 데이터
export interface ConceptData {
  type: ConceptType;
  content: string;
}

// 기둥 옵션
export interface PillarOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  recommended?: boolean;
}

// 기둥 데이터
export interface PillarsData {
  theme: string;
  genre: string;
  artStyle: string;
  framework: string;
}

// 경험 스타일 옵션
export interface ExperienceStyleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  previewImage: string;
  recommended?: boolean;
}

// 파라미터 데이터
export interface ParametersData {
  experienceStyle: string;
  difficulty: number;
  nsfwEnabled: boolean;
}

// 구독 플랜
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  gems: number;
  emoji: string;
  popular?: boolean;
}

// 일회성 팩
export interface OneTimePack {
  id: string;
  name: string;
  price: string;
  gems: number;
  bonus?: boolean;
}

// 템플릿
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  popular?: boolean;
}

// 채팅 데이터
export interface ChatData {
  id: string;
  name: string;
  type: ChatType;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  experienceTitle?: string;
  isOwner?: boolean;
}

// 커스텀 파운데이션 설정
export interface CustomFoundationConfig {
  characterPortraits: number;
  environmentArt: number;
  audioTracks: number;
  storyBeats: number;
  interactiveElements: number;
}

// API 응답 타입들
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 폼 데이터 타입들
export interface CreateExperienceForm {
  concept: ConceptData;
  pillars?: PillarsData;
  parameters?: ParametersData;
  customFoundation?: CustomFoundationConfig;
}

// 이벤트 핸들러 타입들
export type ExperienceClickHandler = (experience: ExperienceData) => void;
export type ChatClickHandler = (chat: ChatData) => void;
export type NavigationHandler = (page: PageType) => void;
export type ModalCloseHandler = () => void;
export type FormSubmitHandler<T> = (data: T) => void;

// 컴포넌트 Props 타입들
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps {
  active?: boolean;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export interface CardProps extends BaseComponentProps {
  onClick?: () => void;
  hover?: boolean;
  glass?: boolean;
}

// 유틸리티 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}; 