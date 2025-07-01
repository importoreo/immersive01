import { ExperienceData, UserProfile, ChatData, Template } from '../types';
import { createGradient } from '../utils';

// Mock 사용자 계정
export const mockUserAccount = {
  gems: 2450,
  hasCreatorSubscription: false,
  subscriptionExpiry: undefined
};

// Mock 경험 데이터
export const mockExperiences: ExperienceData[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Story',
    type: 'visual-story',
    thumbnail: createGradient('#667eea', '#764ba2'),
    playCount: 15420,
    rating: 4.8,
    difficulty: 'Medium',
    createdAt: '2024-01-15',
    description: 'An immersive cyberpunk narrative set in Neo Tokyo 2099. Navigate through neon-lit streets and make choices that determine the fate of humanity.',
    tags: ['cyberpunk', 'future', 'neon', 'story'],
    isPublished: true,
    revenue: 2850,
    creator: 'CyberNinja',
    creatorAvatar: createGradient('#667eea', '#764ba2'),
    duration: '45 min',
    likes: 2340,
    isLiked: false,
    isSaved: false,
    userAnalytics: {
      ageGroups: [
        { age: '18-24', percentage: 35 },
        { age: '25-34', percentage: 42 },
        { age: '35-44', percentage: 18 },
        { age: '45+', percentage: 5 }
      ],
      demographics: [
        { region: 'North America', percentage: 45 },
        { region: 'Europe', percentage: 32 },
        { region: 'Asia', percentage: 18 },
        { region: 'Other', percentage: 5 }
      ],
      engagementTime: 12,
      completionRate: 78
    }
  },
  {
    id: '2',
    title: 'AI Assistant Maya',
    type: 'ai-character',
    thumbnail: createGradient('#4facfe', '#00f2fe'),
    playCount: 8930,
    rating: 4.6,
    difficulty: 'Easy',
    createdAt: '2024-01-10',
    description: 'A helpful AI companion for daily tasks and conversations. Maya learns from your preferences and adapts to your needs.',
    tags: ['ai', 'assistant', 'helpful', 'chat'],
    isPublished: true,
    revenue: 1640,
    creator: 'TechWizard',
    creatorAvatar: createGradient('#4facfe', '#00f2fe'),
    duration: '20 min',
    likes: 1890,
    isLiked: true,
    isSaved: true,
    userAnalytics: {
      ageGroups: [
        { age: '18-24', percentage: 28 },
        { age: '25-34', percentage: 38 },
        { age: '35-44', percentage: 25 },
        { age: '45+', percentage: 9 }
      ],
      demographics: [
        { region: 'North America', percentage: 40 },
        { region: 'Europe', percentage: 35 },
        { region: 'Asia', percentage: 20 },
        { region: 'Other', percentage: 5 }
      ],
      engagementTime: 8,
      completionRate: 85
    }
  },
  {
    id: '3',
    title: 'Virtual Tokyo Streets',
    type: 'interactive-world',
    thumbnail: createGradient('#f093fb', '#f5576c'),
    playCount: 22100,
    rating: 4.9,
    difficulty: 'Hard',
    createdAt: '2024-01-05',
    description: 'Explore the bustling streets of virtual Tokyo in this immersive world. Discover hidden locations and interact with NPCs.',
    tags: ['tokyo', 'exploration', 'virtual', 'immersive'],
    isPublished: true,
    revenue: 4720,
    creator: 'WorldBuilder',
    creatorAvatar: createGradient('#f093fb', '#f5576c'),
    duration: '2 hours',
    likes: 3420,
    isLiked: false,
    isSaved: false,
    userAnalytics: {
      ageGroups: [
        { age: '18-24', percentage: 45 },
        { age: '25-34', percentage: 35 },
        { age: '35-44', percentage: 15 },
        { age: '45+', percentage: 5 }
      ],
      demographics: [
        { region: 'Asia', percentage: 50 },
        { region: 'North America', percentage: 30 },
        { region: 'Europe', percentage: 15 },
        { region: 'Other', percentage: 5 }
      ],
      engagementTime: 25,
      completionRate: 65
    }
  },
  {
    id: '4',
    title: 'Medieval Fantasy Kingdom',
    type: 'visual-story',
    thumbnail: createGradient('#a8edea', '#fed6e3'),
    playCount: 12340,
    rating: 4.7,
    difficulty: 'Medium',
    createdAt: '2024-01-20',
    description: 'Embark on an epic journey through a magical kingdom filled with dragons, wizards, and ancient prophecies.',
    tags: ['fantasy', 'medieval', 'magic', 'adventure'],
    isPublished: true,
    revenue: 3200,
    creator: 'FantasyCreator',
    creatorAvatar: createGradient('#a8edea', '#fed6e3'),
    duration: '1.5 hours',
    likes: 2100,
    isLiked: false,
    isSaved: true,
    userAnalytics: {
      ageGroups: [
        { age: '18-24', percentage: 40 },
        { age: '25-34', percentage: 35 },
        { age: '35-44', percentage: 20 },
        { age: '45+', percentage: 5 }
      ],
      demographics: [
        { region: 'Europe', percentage: 45 },
        { region: 'North America', percentage: 30 },
        { region: 'Asia', percentage: 20 },
        { region: 'Other', percentage: 5 }
      ],
      engagementTime: 18,
      completionRate: 72
    }
  },
  {
    id: '5',
    title: 'Space Station Alpha',
    type: 'interactive-world',
    thumbnail: createGradient('#89f7fe', '#66a6ff'),
    playCount: 8760,
    rating: 4.5,
    difficulty: 'Hard',
    createdAt: '2024-01-12',
    description: 'Navigate through a massive space station orbiting Earth. Solve puzzles, interact with alien species, and uncover cosmic mysteries.',
    tags: ['space', 'sci-fi', 'puzzle', 'alien'],
    isPublished: true,
    revenue: 2100,
    creator: 'SpaceExplorer',
    creatorAvatar: createGradient('#89f7fe', '#66a6ff'),
    duration: '3 hours',
    likes: 1560,
    isLiked: true,
    isSaved: false,
    userAnalytics: {
      ageGroups: [
        { age: '18-24', percentage: 50 },
        { age: '25-34', percentage: 30 },
        { age: '35-44', percentage: 15 },
        { age: '45+', percentage: 5 }
      ],
      demographics: [
        { region: 'North America', percentage: 50 },
        { region: 'Europe', percentage: 25 },
        { region: 'Asia', percentage: 20 },
        { region: 'Other', percentage: 5 }
      ],
      engagementTime: 35,
      completionRate: 58
    }
  }
];

// Mock 사용자 프로필
export const mockUserProfile: UserProfile = {
  username: "digital_creator",
  displayName: "Digital Creator",
  avatar: createGradient('#667eea', '#764ba2'),
  bio: "Creating immersive digital experiences 🚀✨ AI enthusiast & future architect",
  followers: 12500,
  following: 847,
  experiences: 24,
  interests: ['AI', 'VR', 'Storytelling', 'Gaming', 'Future Tech'],
  joinedDate: '2023-03-15'
};

// Mock 채팅 데이터
export const mockChats: ChatData[] = [
  {
    id: '1',
    name: 'Alex Chen',
    type: 'private',
    avatar: createGradient('#667eea', '#764ba2'),
    lastMessage: 'Love your latest AI character!',
    timestamp: '2m',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Sarah Kim',
    type: 'private',
    avatar: createGradient('#f093fb', '#f5576c'),
    lastMessage: 'Thanks for the collaboration 🚀',
    timestamp: '15m',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Neon Cyberpunk Community',
    type: 'experience-group',
    avatar: createGradient('#667eea', '#764ba2'),
    lastMessage: 'Player: "Amazing storyline!"',
    timestamp: '5m',
    unreadCount: 12,
    experienceTitle: 'Neon Cyberpunk Story',
    isOwner: true
  },
  {
    id: '4',
    name: 'Fantasy Creators Guild',
    type: 'experience-group',
    avatar: createGradient('#a8edea', '#fed6e3'),
    lastMessage: 'Admin: "New contest announced!"',
    timestamp: '1h',
    unreadCount: 5,
    experienceTitle: 'Medieval Fantasy Kingdom',
    isOwner: false
  }
];

// Mock 템플릿 데이터
export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Cyberpunk City',
    description: 'Neon-lit streets with futuristic buildings and flying cars',
    category: 'Sci-Fi',
    thumbnail: createGradient('#667eea', '#764ba2'),
    popular: true
  },
  {
    id: '2',
    title: 'Medieval Fantasy',
    description: 'Magical kingdoms with castles, dragons, and mystical creatures',
    category: 'Fantasy',
    thumbnail: createGradient('#f093fb', '#f5576c'),
    popular: true
  },
  {
    id: '3',
    title: 'Space Station',
    description: 'Futuristic space habitat with zero gravity environments',
    category: 'Sci-Fi',
    thumbnail: createGradient('#4facfe', '#00f2fe')
  },
  {
    id: '4',
    title: 'Underwater City',
    description: 'Submerged civilization with coral architecture and marine life',
    category: 'Adventure',
    thumbnail: createGradient('#a8edea', '#fed6e3')
  },
  {
    id: '5',
    title: 'Steampunk Workshop',
    description: 'Victorian-era workshop with mechanical contraptions and steam power',
    category: 'Steampunk',
    thumbnail: createGradient('#ffecd2', '#fcb69f')
  }
];

// 랜덤 프롬프트 제안
export const randomPrompts = [
  "Create a futuristic cyberpunk city with neon lights, flying cars, and towering skyscrapers. Players can explore different districts, interact with NPCs, and discover hidden secrets in the underground.",
  "Design a magical fantasy realm with floating islands, ancient temples, and mystical creatures. Include interactive spells, treasure hunts, and epic quests across multiple kingdoms.",
  "Build an underwater civilization with coral cities, submarine vehicles, and marine life companions. Players navigate through ocean trenches and discover lost Atlantis-style ruins.",
  "Develop a space colony on Mars with domed habitats, rover exploration, and alien artifact discoveries. Include survival mechanics and interplanetary communication.",
  "Create a steampunk Victorian London with airships, mechanical automatons, and steam-powered inventions. Players solve mysteries and navigate social hierarchies."
]; 