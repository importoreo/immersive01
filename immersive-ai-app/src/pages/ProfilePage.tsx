import React, { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { ExperienceData, UserProfile } from '../types';
import { mockUserProfile, mockExperiences } from '../data/mockData';
import { formatNumber } from '../utils';
import ExperienceCard from '../components/experience/ExperienceCard';
import ExperienceDetailModal from '../components/experience/ExperienceDetailModal';

const ProfilePage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);

  const ProfileExperienceCard: React.FC<{
    experience: ExperienceData;
    onClick: () => void;
  }> = ({ experience, onClick }) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'visual-story':
          return <Icon name="FiImage" size={14} />;
        case 'interactive-world':
          return <Icon name="FiHeadphones" size={14} />;
        case 'ai-character':
          return <Icon name="FiActivity" size={14} />;
        default:
          return <Icon name="FiPlay" size={14} />;
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
        role="button"
        tabIndex={0}
        aria-label={`${experience.title} 경험 보기`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
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
                <Icon name="FiPlay" size={10} className="text-white/70" />
                <span className="text-white/70 text-xs">
                  {experience.playCount > 1000 ? `${Math.floor(experience.playCount / 1000)}k` : experience.playCount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="FiStar" size={10} className="text-yellow-400" />
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
            className="text-white/60 hover:text-white transition-colors"
            aria-label="설정"
          >
            <Icon name="FiSettings" size={24} />
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
            <p className="text-white font-bold text-lg">{formatNumber(userProfile.followers)}</p>
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
    </>
  );
};

export default ProfilePage; 