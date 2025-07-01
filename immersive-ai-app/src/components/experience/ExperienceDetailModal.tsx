import React, { useState } from 'react';
import { Icon } from '../ui/Icon';
import { ExperienceData, ModalCloseHandler } from '../../types';
import { getExperienceTypeColor, formatNumber } from '../../utils';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface ExperienceDetailModalProps {
  experience: ExperienceData;
  onClose: ModalCloseHandler;
}

const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({ 
  experience, 
  onClose 
}) => {
  const [liked, setLiked] = useState(experience.isLiked || false);
  const [saved, setSaved] = useState(experience.isSaved || false);
  const [likeCount, setLikeCount] = useState(experience.likes);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual-story':
        return <Icon name="FiImage" size={16} className="text-purple-400" />;
      case 'interactive-world':
        return <Icon name="FiHeadphones" size={16} className="text-pink-400" />;
      case 'ai-character':
        return <Icon name="FiActivity" size={16} className="text-blue-400" />;
      default:
        return <Icon name="FiPlay" size={16} />;
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
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          {getTypeIcon(experience.type)}
          <span className="text-white/80 text-sm capitalize">
            {experience.type.replace('-', ' ')}
          </span>
        </div>
        <button className="text-white/60 hover:text-white">
                      <Icon name="FiMoreHorizontal" size={24} />
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
          aria-label="경험 재생"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all transform group-hover:scale-110">
            <Icon name="Play" size={24} className="text-white ml-1" />
          </div>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-lg font-bold mb-1 text-shadow-lg">
            {experience.title}
          </h2>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>{experience.duration}</span>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={12} className="text-yellow-400" />
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
            <p className="text-white/60 text-xs">
              {formatNumber(experience.playCount)} plays
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around mb-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <button 
            onClick={handleLike}
            className={`flex flex-col items-center gap-1 transition-colors ${
              liked ? 'text-red-500' : 'text-white/70 hover:text-white'
            }`}
            aria-label={liked ? '좋아요 취소' : '좋아요'}
          >
            <Icon name="Heart" size={20} className={liked ? 'text-red-500 fill-current' : 'text-white/70'} />
            <span className="text-xs">{formatNumber(likeCount)}</span>
          </button>
          
          <button 
            onClick={handleComment}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
            aria-label="댓글 보기"
          >
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs">Comment</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
            aria-label="공유하기"
          >
            <Icon name="Share" size={20} />
            <span className="text-xs">Share</span>
          </button>
          
          <button 
            onClick={handleSave}
            className={`flex flex-col items-center gap-1 transition-colors ${
              saved ? 'text-blue-400' : 'text-white/70 hover:text-white'
            }`}
            aria-label={saved ? '저장 취소' : '저장하기'}
          >
            <Icon name="Bookmark" size={20} className={saved ? 'text-blue-400 fill-current' : 'text-white/70'} />
            <span className="text-xs">Save</span>
          </button>
        </div>

        {experience.description && (
          <div className="mb-4">
            <p className="text-white/80 text-sm leading-relaxed">
              {experience.description}
            </p>
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
        <Button onClick={handlePlay} className="w-full">
          <Icon name="Play" size={20} />
          Play Experience
        </Button>
      </div>
    </Modal>
  );
};

export default ExperienceDetailModal; 