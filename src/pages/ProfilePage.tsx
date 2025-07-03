import React, { useState } from 'react';
import { Settings, Play, Star, Image, Headphones, Bot, ChevronLeft, X, Heart, MessageCircle, Share, Bookmark, Save, DollarSign, Zap, FileText, TrendingUp, BarChart2, MoreHorizontal, LogOut } from 'lucide-react';
import { ExperienceData, UserProfile } from '../types';
import ExperienceDetailModal from '../components/common/ExperienceDetailModal';

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
  },
  {
    id: '4',
    title: 'Quantum Dreams',
    type: 'interactive-world',
    thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    playCount: 5670,
    rating: 4.5,
    difficulty: 'Medium',
    createdAt: '2024-01-03',
    description: 'A surreal journey through quantum realities.',
    tags: ['quantum', 'dream', 'science'],
    isPublished: true,
    revenue: 890,
    creator: 'Dreamer',
    creatorAvatar: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    duration: '1 hour',
    likes: 1200,
    isLiked: false,
    isSaved: false,
    userAnalytics: {
      ageGroups: [],
      demographics: [],
      engagementTime: 15,
      completionRate: 70
    }
  },
  {
    id: '5',
    title: 'Space Explorer Bot',
    type: 'ai-character',
    thumbnail: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    playCount: 11200,
    rating: 4.7,
    difficulty: 'Easy',
    createdAt: '2024-01-02',
    description: 'An AI bot for exploring the universe.',
    tags: ['space', 'explorer', 'ai'],
    isPublished: true,
    revenue: 1980,
    creator: 'AstroAI',
    creatorAvatar: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    duration: '30 min',
    likes: 2100,
    isLiked: false,
    isSaved: false,
    userAnalytics: {
      ageGroups: [],
      demographics: [],
      engagementTime: 10,
      completionRate: 80
    }
  }
];

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
    <div className="absolute inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-start justify-center pt-16">
      <div className="bg-[#18181c] backdrop-blur-xl rounded-2xl border border-white/20 w-[360px] max-h-[700px] overflow-hidden">
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
                <label className="block text-white/70 text-xs mb-1">Display Name</label>
                <input
                  type="text"
                  value={editedProfile.displayName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-md px-2 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Username</label>
                <input
                  type="text"
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-md px-2 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Bio</label>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-md px-2 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Interests</label>
                <input
                  type="text"
                  value={editedProfile.interests?.join(', ') || ''}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, interests: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  className="w-full bg-white/5 border border-white/20 rounded-md px-2 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                  placeholder="AI, VR, Storytelling, Gaming, Future Tech"
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
            <div className="p-4 space-y-5">
              {/* Creator Profile */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-2">
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-white/10 rounded-full p-2"><Bot size={20} className="text-white" /></span>
                  <div>
                    <p className="text-white font-semibold text-sm">Creator Profile</p>
                    <p className="text-white/80 text-xs">{userProfile.displayName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-pink-500/20 rounded-full p-2"><Headphones size={18} className="text-pink-400" /></span>
                  <div>
                    <p className="text-white font-semibold text-sm">World Builder</p>
                    <p className="text-white/60 text-xs">You create mostly interactive world experiences</p>
                  </div>
                </div>
              </div>

              {/* 2x2 statistics card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={16} className="text-blue-400" />
                    <span className="text-white/60 text-xs">Total Plays</span>
                  </div>
                  <p className="text-white font-bold text-lg">{totalPlays.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="text-white/60 text-xs">Avg Rating</span>
                  </div>
                  <p className="text-white font-bold text-lg">{avgRating.toFixed(1)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} className="text-green-400" />
                    <span className="text-white/60 text-xs">Published</span>
                  </div>
                  <p className="text-white font-bold text-lg">{publishedExperiences.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-white/60 text-xs">Drafts</span>
                  </div>
                  <p className="text-white font-bold text-lg">{experiences.filter(exp => !exp.isPublished).length}</p>
                </div>
              </div>

              {/* Most Popular Experience */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white font-semibold mb-2 flex items-center gap-2"><TrendingUp size={18} className="text-pink-400" /> Most Popular Experience</p>
                {publishedExperiences.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{backgroundImage: publishedExperiences.reduce((a, b) => a.playCount > b.playCount ? a : b).thumbnail, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                    <div>
                      <p className="text-white font-bold text-sm">{publishedExperiences.reduce((a, b) => a.playCount > b.playCount ? a : b).title}</p>
                      <p className="text-white/60 text-xs">{publishedExperiences.reduce((a, b) => a.playCount > b.playCount ? a : b).playCount.toLocaleString()} plays</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Your Play Preferences */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white font-semibold mb-2 flex items-center gap-2"><BarChart2 size={18} className="text-blue-400" /> Your Play Preferences</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/80">AI Characters</span>
                    <span className="text-blue-400 font-bold">45%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full mb-2"><div className="h-2 bg-blue-400 rounded-full" style={{width: '45%'}} /></div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/80">Interactive Worlds</span>
                    <span className="text-pink-400 font-bold">32%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full mb-2"><div className="h-2 bg-pink-400 rounded-full" style={{width: '32%'}} /></div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/80">Visual Stories</span>
                    <span className="text-purple-400 font-bold">23%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full"><div className="h-2 bg-purple-400 rounded-full" style={{width: '23%'}} /></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-5">
              {/* Monthly Revenue */}
              <div className="bg-green-900/80 rounded-xl p-4 border border-green-700 mb-2">
                <p className="text-green-200 font-semibold text-sm flex items-center gap-2 mb-1">
                  <DollarSign size={20} className="text-green-300" /> Monthly Revenue
                </p>
                <p className="text-green-400 text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-green-300 text-xs mt-1">+15% from last month</p>
              </div>

              {/* Experience Revenue */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-2">
                <p className="text-white font-semibold mb-3">Experience Revenue</p>
                <div className="space-y-3">
                  {publishedExperiences.map(exp => (
                    <div key={exp.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{backgroundImage: exp.thumbnail, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">{exp.title}</p>
                          <p className="text-white/60 text-xs">{exp.playCount.toLocaleString()} plays</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-bold text-lg">${exp.revenue?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Revenue Generator */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-yellow-400 font-semibold mb-2 flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Top Revenue Generator</p>
                {publishedExperiences.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{backgroundImage: publishedExperiences.reduce((a, b) => (a.revenue || 0) > (b.revenue || 0) ? a : b).thumbnail, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                    <div>
                      <p className="text-white font-bold text-sm">{publishedExperiences.reduce((a, b) => (a.revenue || 0) > (b.revenue || 0) ? a : b).title}</p>
                      <p className="text-green-400 font-bold text-base">${publishedExperiences.reduce((a, b) => (a.revenue || 0) > (b.revenue || 0) ? a : b).revenue?.toLocaleString()}/month</p>
                    </div>
                  </div>
                )}
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
        <div className="grid grid-cols-3 gap-2 mt-8">
          {[
            ...mockExperiences.filter(exp => !exp.isPublished),
            ...mockExperiences.filter(exp => exp.isPublished)
          ].map((experience) => (
            <ProfileExperienceCard
              key={experience.id}
              experience={experience}
              onClick={() => setSelectedExperience(experience)}
            />
          ))}
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          userProfile={userProfile}
          experiences={mockExperiences}
          onClose={() => setShowSettings(false)}
          onSave={setUserProfile}
        />
      )}

      {selectedExperience && (
        <ExperienceDetailModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </>
  );
}; 