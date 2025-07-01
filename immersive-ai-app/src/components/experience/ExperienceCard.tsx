import React from 'react';
import { Icon } from '../ui/Icon';
import { ExperienceData, ExperienceClickHandler } from '../../types';
import { getExperienceTypeColor, formatNumber } from '../../utils';
import { cn } from '../../utils';

interface ExperienceCardProps {
  experience: ExperienceData;
  size?: 'normal' | 'large';
  onClick: ExperienceClickHandler;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  size = 'normal', 
  onClick,
  className 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual-story':
        return <Icon name="FiImage" size={12} className="text-purple-400" />;
      case 'interactive-world':
        return <Icon name="FiHeadphones" size={12} className="text-pink-400" />;
      case 'ai-character':
        return <Icon name="FiActivity" size={12} className="text-blue-400" />;
      default:
        return <Icon name="FiPlay" size={12} />;
    }
  };

  const cardWidth = size === 'large' ? 'w-32' : 'w-28';
  const cardHeight = size === 'large' ? 'h-48' : 'h-40';

  const handleClick = () => {
    onClick(experience);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        `${cardWidth} ${cardHeight} flex-shrink-0 rounded-lg overflow-hidden cursor-pointer card-hover group relative`,
        className
      )}
      style={{
        backgroundImage: experience.thumbnail,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="button"
      tabIndex={0}
      aria-label={`${experience.title} 경험 보기`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full backdrop-blur-sm">
        {getTypeIcon(experience.type)}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name="FiPlay" size={16} className="text-white ml-0.5" />
        </div>
      </div>

      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-white text-xs font-medium truncate text-shadow">
          {experience.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <Icon name="FiStar" size={8} className="text-yellow-400" />
            <span className="text-white/70 text-xs">{experience.rating.toFixed(1)}</span>
          </div>
          <span className="text-white/60 text-xs">{experience.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard; 