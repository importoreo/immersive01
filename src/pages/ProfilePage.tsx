import React, { useState } from 'react';
import { Settings, Play, Star, Image, Headphones, Bot, ChevronLeft, X, Heart, MessageCircle, Share, Bookmark, Save, DollarSign } from 'lucide-react';
import { ExperienceData, UserProfile } from '../types';

// Mock data
const mockUserProfile: UserProfile = {
  username: "digital_creator",
  displayName: "Digital Creator",
  avatar: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  bio: "Creating immersive digital experiences 🚀✨ AI enthusiast & future architect",
  followers: 12500,
  following: 847,
  experiences: 24,
  interests: ['AI', 'VR', 'Storytelling', 'Gaming', 'Future Tech'],
  joinedDate: '2023-03-15'
};

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
    description: 'An immersive cyberpunk narrative set in Neo Tokyo 2099.',
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
      ageGroups: [],
      demographics: [],
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
    description: 'A helpful AI companion for daily tasks.',
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
      ageGroups: [],
      demographics: [],
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
    description: 'Explore the bustling streets of virtual Tokyo.',
    tags: ['tokyo', 'exploration', 'virtual', 'immersive'],
    isPublished: false,
    revenue: 4720,
    creator: 'WorldBuilder',
    creatorAvatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    duration: '2 hours',
    likes: 3420,
    isLiked: false,
    isSaved: false,
    userAnalytics: {
      ageGroups: [],
      demographics: [],
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

// Component: Settings Modal
interface SettingsModalProps {
  userProfile: UserProfile;
  experiences: ExperienceData[];
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

function SettingsModal({ userProfile, experiences, onClose, onSave }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics' | 'monetization'>('profile');
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const publishedExperiences = experiences.filter(exp => exp.isPublished);
  const totalPlays = publishedExperiences.reduce((sum, exp) => sum + exp.playCount, 0);
  const avgRating = publishedExperiences.reduce((sum, exp) => sum + exp.rating, 0) / publishedExperiences.length;
  const totalRevenue = publishedExperiences.reduce((sum, exp) => sum + (exp.revenue || 0), 0);

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-start justify-center pt-16">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-[360px] max-h-[700px] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-white font-semibold">Settings</h2>
          <div className="w-6" />
        </div>

        <div className="flex border-b border-white/20">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-white border-b-2 border-blue-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'text-white border-b-2 border-blue-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
              activeTab === 'monetization'
                ? 'text-white border-b-2 border-blue-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Revenue
          </button>
        </div>

        <div className="max-h-[580px] overflow-y-auto">
          {activeTab === 'profile' ? (
            <div className="p-4 space-y-4">
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-3 border-white/20"
                  style={{
                    backgroundImage: editedProfile.avatar,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <button className="text-blue-400 text-sm hover:text-blue-300">
                  Change Photo
                </button>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Display Name</label>
                <input
                  type="text"
                  value={editedProfile.displayName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Bio</label>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-20 resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-6"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          ) : activeTab === 'analytics' ? (
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={16} className="text-blue-400" />
                    <span className="text-white/60 text-sm">Total Plays</span>
                  </div>
                  <p className="text-white font-semibold text-lg">{totalPlays.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-white/60 text-sm">Avg Rating</span>
                  </div>
                  <p className="text-white font-semibold text-lg">{avgRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/20">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <DollarSign size={18} className="text-green-400" />
                  Monthly Revenue
                </h3>
                <p className="text-green-400 text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-white/60 text-sm mt-1">
                  +15% from last month
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ProfilePage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);

  const ProfileExperienceCard = ({ experience, onClick }: {
    experience: ExperienceData;
    onClick: () => void;
  }) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'visual-story':
          return <Image size={14} />;
        case 'interactive-world':
          return <Headphones size={14} />;
        case 'ai-character':
          return <Bot size={14} />;
        default:
          return <Play size={14} />;
      }
    };

    return (
      <div
        onClick={onClick}
        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] border border-white/20 ${
          !experience.isPublished ? 'grayscale opacity-60' : ''
        }`}
        style={{
          backgroundImage: experience.thumbnail,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {!experience.isPublished && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gray-600/80 rounded-full backdrop-blur-sm">
            <span className="text-white text-xs font-semibold">UNPUBLISHED</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm">
          <div className={`${!experience.isPublished ? 'text-gray-400' : 'text-white/90'}`}>
            {getTypeIcon(experience.type)}
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <p className={`text-xs font-medium truncate ${!experience.isPublished ? 'text-gray-300' : 'text-white'}`}>
            {experience.title}
          </p>
          {experience.isPublished && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Play size={10} className="text-white/70" />
                <span className="text-white/70 text-xs">{experience.playCount > 1000 ? `${Math.floor(experience.playCount / 1000)}k` : experience.playCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={10} className="text-yellow-400" />
                <span className="text-white/70 text-xs">{experience.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-bold">Profile</h1>
          <button 
            onClick={() => setShowSettings(true)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Settings size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-20 h-20 rounded-full border-3 border-white/20"
            style={{
              backgroundImage: userProfile.avatar,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">{userProfile.displayName}</h2>
            <p className="text-white/60 text-sm">@{userProfile.username}</p>
          </div>
        </div>

        <p className="text-white/80 text-sm mb-4">{userProfile.bio}</p>

        <div className="flex justify-around bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="text-center">
            <p className="text-white font-bold text-lg">{userProfile.experiences}</p>
            <p className="text-white/60 text-xs">Experiences</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{userProfile.followers.toLocaleString()}</p>
            <p className="text-white/60 text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{userProfile.following}</p>
            <p className="text-white/60 text-xs">Following</p>
          </div>
        </div>
      </div>

      <div className="absolute top-[340px] left-0 right-0 bottom-[114px] overflow-y-auto px-4">
        <div className="grid grid-cols-3 gap-2">
          {mockExperiences.map((experience) => (
            <ProfileExperienceCard
              key={experience.id}
              experience={experience}
              onClick={() => setSelectedExperience(experience)}
            />
          ))}
        </div>
      </div>

      {selectedExperience && (
        <ExperienceDetailModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}

      {showSettings && (
        <SettingsModal
          userProfile={userProfile}
          experiences={mockExperiences}
          onClose={() => setShowSettings(false)}
          onSave={setUserProfile}
        />
      )}
    </>
  );
}; 