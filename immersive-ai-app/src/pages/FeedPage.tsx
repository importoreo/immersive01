import React, { useState, useMemo } from 'react';
import { Icon } from '../components/ui/Icon';
import { ExperienceData, ExperienceClickHandler } from '../types';
import { formatNumber } from '../utils';
import ExperienceCard from '../components/experience/ExperienceCard';
import ExperienceDetailModal from '../components/experience/ExperienceDetailModal';

interface FeedPageProps {
  experiences: ExperienceData[];
}

const FeedPage: React.FC<FeedPageProps> = ({ experiences }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

  const {
    trendingExperiences,
    newReleases,
    popularAICharacters,
    interactiveWorlds,
    visualStories,
    featuredExperience
  } = useMemo(() => {
    const trending = [...experiences.slice(0, 3)];
    const newReleases = [...experiences.slice(0, 3)];
    const aiCharacters = experiences.filter(exp => exp.type === 'ai-character');
    const worlds = experiences.filter(exp => exp.type === 'interactive-world');
    const stories = experiences.filter(exp => exp.type === 'visual-story');
    const featured = experiences[0];

    return {
      trendingExperiences: trending,
      newReleases,
      popularAICharacters: aiCharacters,
      interactiveWorlds: worlds,
      visualStories: stories,
      featuredExperience: featured
    };
  }, [experiences]);

  const handleExperienceClick: ExperienceClickHandler = (experience) => {
    setSelectedExperience(experience);
  };

  const handlePlayFeatured = () => {
    console.log('Playing featured experience:', featuredExperience.title);
  };

  const handleFeaturedInfo = () => {
    setSelectedExperience(featuredExperience);
  };

  const ExperienceRow: React.FC<{
    title: string;
    experiences: ExperienceData[];
    size?: 'normal' | 'large';
  }> = ({ title, experiences, size = 'normal' }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <Icon name="FiChevronRight" size={20} className="text-white/60" />
      </div>
      
      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            size={size}
            onClick={handleExperienceClick}
          />
        ))}
      </div>
    </div>
  );

  const HeroSection: React.FC = () => (
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
            <Icon name="FiStar" size={12} className="text-yellow-400" />
            <span className="text-white text-sm">{featuredExperience.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h1 className="text-white text-2xl font-bold mb-2 text-shadow-lg">
          {featuredExperience.title}
        </h1>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {featuredExperience.description}
        </p>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayFeatured}
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Icon name="FiPlay" size={16} />
            Play
          </button>
          
          <button
            onClick={handleFeaturedInfo}
            className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <Icon name="FiInfo" size={16} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="absolute top-[75px] left-0 right-0 px-4 z-10">
        <h1 className="text-white text-xl font-bold">Home</h1>
      </div>

      <div className="absolute top-[115px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <HeroSection />

        <div className="pt-6">
          <ExperienceRow
            title="Trending Now"
            experiences={trendingExperiences}
            size="large"
          />

          <ExperienceRow
            title="New Releases"
            experiences={newReleases}
          />

          <ExperienceRow
            title="Popular AI Characters"
            experiences={popularAICharacters}
          />

          <ExperienceRow
            title="Interactive Worlds"
            experiences={interactiveWorlds}
          />

          <ExperienceRow
            title="Visual Stories"
            experiences={visualStories}
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

export default FeedPage; 