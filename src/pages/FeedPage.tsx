import { useState } from 'react';
import { Play, Star, Info, ChevronRight, X, Heart, MessageCircle, Share, Bookmark, Image, Headphones, Bot } from 'lucide-react';
import { ExperienceData } from '../types';

// Mock data
const mockExperiences: ExperienceData[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Story',
    type: 'visual-story',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    playCount: 15420,
    rating: 4.8,
    difficulty: 'Medium',
    createdAt: '2024-01-15',
    description: 'An immersive cyberpunk narrative set in Neo Tokyo 2099. Navigate through neon-lit streets and make choices that determine the fate of humanity.',
    tags: ['cyberpunk', 'future', 'neon', 'story'],
    isPublished: true,
    revenue: 2850,
    creator: 'CyberNinja',
    creatorAvatar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    playCount: 8930,
    rating: 4.6,
    difficulty: 'Easy',
    createdAt: '2024-01-10',
    description: 'A helpful AI companion for daily tasks and conversations. Maya learns from your preferences and adapts to your needs.',
    tags: ['ai', 'assistant', 'helpful', 'chat'],
    isPublished: true,
    revenue: 1640,
    creator: 'TechWizard',
    creatorAvatar: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    playCount: 22100,
    rating: 4.9,
    difficulty: 'Hard',
    createdAt: '2024-01-05',
    description: 'Explore the bustling streets of virtual Tokyo in this immersive world. Discover hidden locations and interact with NPCs.',
    tags: ['tokyo', 'exploration', 'virtual', 'immersive'],
    isPublished: true,
    revenue: 4720,
    creator: 'WorldBuilder',
    creatorAvatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
  }
];

// Component: Experience Detail Modal
interface ExperienceDetailModalProps {
  experience: ExperienceData;
  onClose: () => void;
}

function ExperienceDetailModal({ experience, onClose }: ExperienceDetailModalProps) {
  const [liked, setLiked] = useState(experience.isLiked || false);
  const [saved, setSaved] = useState(experience.isSaved || false);
  const [likeCount, setLikeCount] = useState(experience.likes);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual-story':
        return <Image size={16} className="text-purple-400" />;
      case 'interactive-world':
        return <Headphones size={16} className="text-pink-400" />;
      case 'ai-character':
        return <Bot size={16} className="text-blue-400" />;
      default:
        return <Play size={16} />;
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handlePlay = () => {
    console.log('Playing experience:', experience.title);
  };

  const handleShare = () => {
    console.log('Sharing experience:', experience.title);
  };

  const handleComment = () => {
    console.log('Opening comments for:', experience.title);
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-[360px] max-h-[600px] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
          <div className="flex items-center gap-2">
            {getTypeIcon(experience.type)}
            <span className="text-white/80 text-sm capitalize">{experience.type.replace('-', ' ')}</span>
          </div>
          <button className="text-white/60 hover:text-white">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            </div>
          </button>
        </div>

        <div 
          className="w-full h-48 relative"
          style={{
            backgroundImage: experience.thumbnail,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all transform group-hover:scale-110">
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white text-lg font-bold mb-1">{experience.title}</h2>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span>{experience.duration}</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" />
                <span>{experience.rating.toFixed(1)}</span>
              </div>
              <span className="capitalize">{experience.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-full"
              style={{
                backgroundImage: experience.creatorAvatar,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div>
              <p className="text-white font-medium text-sm">{experience.creator}</p>
              <p className="text-white/60 text-xs">{experience.playCount.toLocaleString()} plays</p>
            </div>
          </div>

          <div className="flex items-center justify-around mb-4 py-3 bg-white/5 rounded-xl border border-white/10">
            <button 
              onClick={handleLike}
              className={`flex flex-col items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-white/70 hover:text-white'}`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span className="text-xs">{likeCount.toLocaleString()}</span>
            </button>
            
            <button 
              onClick={handleComment}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <MessageCircle size={20} />
              <span className="text-xs">Comment</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <Share size={20} />
              <span className="text-xs">Share</span>
            </button>
            
            <button 
              onClick={handleSave}
              className={`flex flex-col items-center gap-1 transition-colors ${saved ? 'text-blue-400' : 'text-white/70 hover:text-white'}`}
            >
              <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
              <span className="text-xs">Save</span>
            </button>
          </div>

          {experience.description && (
            <div className="mb-4">
              <p className="text-white/80 text-sm leading-relaxed">{experience.description}</p>
            </div>
          )}

          {experience.tags && experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-white/70 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handlePlay}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Play Experience
          </button>
        </div>
      </div>
    </div>
  );
}

// Component: Experience Card
interface ExperienceCardProps {
  experience: ExperienceData;
  size?: 'normal' | 'large';
  onClick: () => void;
}

function ExperienceCard({ experience, size = 'normal', onClick }: ExperienceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual-story':
        return <Image size={12} className="text-purple-400" />;
      case 'interactive-world':
        return <Headphones size={12} className="text-pink-400" />;
      case 'ai-character':
        return <Bot size={12} className="text-blue-400" />;
      default:
        return <Play size={12} />;
    }
  };

  const cardWidth = size === 'large' ? 'w-32' : 'w-28';
  const cardHeight = size === 'large' ? 'h-48' : 'h-40';

  return (
    <div
      onClick={onClick}
      className={`${cardWidth} ${cardHeight} flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:z-10 group relative`}
      style={{
        backgroundImage: experience.thumbnail,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full backdrop-blur-sm">
        {getTypeIcon(experience.type)}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Play size={16} className="text-white ml-0.5" fill="white" />
        </div>
      </div>

      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-white text-xs font-medium truncate">{experience.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <Star size={8} className="text-yellow-400" />
            <span className="text-white/70 text-xs">{experience.rating.toFixed(1)}</span>
          </div>
          <span className="text-white/60 text-xs">{experience.duration}</span>
        </div>
      </div>
    </div>
  );
}

// Component: Experience Row
interface ExperienceRowProps {
  title: string;
  experiences: ExperienceData[];
  onExperienceClick: (experience: ExperienceData) => void;
  size?: 'normal' | 'large';
}

function ExperienceRow({ title, experiences, onExperienceClick, size = 'normal' }: ExperienceRowProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <ChevronRight size={20} className="text-white/60" />
      </div>
      
      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            size={size}
            onClick={() => onExperienceClick(experience)}
          />
        ))}
      </div>
    </div>
  );
}

// Component: Hero Section
interface HeroSectionProps {
  featuredExperience: ExperienceData;
  onPlay: () => void;
  onInfo: () => void;
}

function HeroSection({ featuredExperience, onPlay, onInfo }: HeroSectionProps) {
  return (
    <div 
      className="h-64 relative overflow-hidden"
      style={{
        backgroundImage: featuredExperience.thumbnail,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">FEATURED</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400" />
            <span className="text-white text-sm">{featuredExperience.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h1 className="text-white text-2xl font-bold mb-2">{featuredExperience.title}</h1>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{featuredExperience.description}</p>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onPlay}
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Play size={16} />
            Play
          </button>
          
          <button
            onClick={onInfo}
            className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <Info size={16} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

// Main FeedPage Component
export const FeedPage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

  const trendingExperiences = [...mockExperiences.slice(0, 3)];
  const newReleases = [...mockExperiences.slice(0, 3)];
  const popularAICharacters = mockExperiences.filter(exp => exp.type === 'ai-character');
  const interactiveWorlds = mockExperiences.filter(exp => exp.type === 'interactive-world');
  const visualStories = mockExperiences.filter(exp => exp.type === 'visual-story');
  
  const featuredExperience = mockExperiences[0];

  const handleExperienceClick = (experience: ExperienceData) => {
    setSelectedExperience(experience);
  };

  const handlePlayFeatured = () => {
    console.log('Playing featured experience:', featuredExperience.title);
  };

  const handleFeaturedInfo = () => {
    setSelectedExperience(featuredExperience);
  };

  return (
    <>
      <div className="absolute top-[75px] left-0 right-0 px-4 z-10">
        <h1 className="text-white text-xl font-bold">Home</h1>
      </div>

      <div className="absolute top-[115px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <HeroSection
          featuredExperience={featuredExperience}
          onPlay={handlePlayFeatured}
          onInfo={handleFeaturedInfo}
        />

        <div className="pt-6">
          <ExperienceRow
            title="Trending Now"
            experiences={trendingExperiences}
            onExperienceClick={handleExperienceClick}
            size="large"
          />

          <ExperienceRow
            title="New Releases"
            experiences={newReleases}
            onExperienceClick={handleExperienceClick}
          />

          <ExperienceRow
            title="Popular AI Characters"
            experiences={popularAICharacters}
            onExperienceClick={handleExperienceClick}
          />

          <ExperienceRow
            title="Interactive Worlds"
            experiences={interactiveWorlds}
            onExperienceClick={handleExperienceClick}
          />

          <ExperienceRow
            title="Visual Stories"
            experiences={visualStories}
            onExperienceClick={handleExperienceClick}
          />
        </div>
      </div>

      {selectedExperience && (
        <ExperienceDetailModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </>
  );
}; 