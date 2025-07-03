import React, { useState, useRef, useEffect } from "react";
import {
  Play, Star, X, Heart, MessageCircle, Share, Bookmark, Image, Headphones, Bot, MoreHorizontal, ChevronLeft
} from "lucide-react";
import type { ExperienceData } from "../../types";

interface ExperienceDetailModalProps {
  experience: ExperienceData;
  onClose: () => void;
}

const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({ experience, onClose }) => {
  const [liked, setLiked] = useState(experience.isLiked || false);
  const [saved, setSaved] = useState(experience.isSaved || false);
  const [likeCount, setLikeCount] = useState(experience.likes);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

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
    // 실제 플레이 로직은 필요시 구현
    console.log('Playing experience:', experience.title);
  };

  const handleShare = () => {
    // 실제 공유 로직은 필요시 구현
    console.log('Sharing experience:', experience.title);
  };

  const handleComment = () => {
    // 실제 댓글 로직은 필요시 구현
    console.log('Opening comments for:', experience.title);
  };

  const menuOptions = [
    { label: 'Edit in GM mode', onClick: () => { console.log('Edit in GM mode'); setMenuOpen(false); } },
    { label: 'Setting', onClick: () => { console.log('Setting'); setMenuOpen(false); } },
    { label: 'Report', onClick: () => { console.log('Report'); setMenuOpen(false); } },
    { label: 'Delete', onClick: () => { console.log('Delete'); setMenuOpen(false); } },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-[#18181c] backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-[360px] max-h-[600px] overflow-y-auto relative">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 relative">
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            {getTypeIcon(experience.type)}
            <span className="text-white/80 text-sm capitalize">{experience.type.replace('-', ' ')}</span>
          </div>
          {experience.isPublished !== false && (
            <div className="relative" ref={menuRef}>
              <button className="text-white/60 hover:text-white" onClick={() => setMenuOpen(v => !v)}>
                <MoreHorizontal size={22} className="text-white/60" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-white/10 rounded-xl shadow-lg z-50 py-2 animate-fade-in">
                  {menuOptions.map(option => (
                    <button
                      key={option.label}
                      onClick={option.onClick}
                      className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 transition-colors text-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 썸네일 및 타이틀 */}
        <div 
          className="w-full h-48 relative"
          style={{
            backgroundImage: experience.thumbnail,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: experience.isPublished === false ? 'grayscale(1)' : undefined,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={experience.isPublished === false ? undefined : handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
            disabled={experience.isPublished === false}
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

        {/* 크리에이터, 플레이수 */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-full"
              style={{
                backgroundImage: experience.creatorAvatar,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: experience.isPublished === false ? 'grayscale(1)' : undefined,
              }}
            />
            <div>
              <p className="text-white font-medium text-sm">{experience.creator}</p>
              <p className="text-white/60 text-xs">{experience.playCount.toLocaleString()} plays</p>
            </div>
          </div>

          {/* 좋아요/댓글/공유/저장 */}
          {experience.isPublished !== false && (
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
          )}

          {/* 설명 */}
          {experience.description && (
            <p className="text-white/80 text-sm leading-relaxed mb-4">{experience.description}</p>
          )}

          {/* 태그 */}
          {experience.tags && experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-[-20px]">
              {experience.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-white/70 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Play/Continue Editing 버튼 */}
        <div className="m-6 pt-0 border-t border-white/20">
          {experience.isPublished === false ? (
            <button
              className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4 mb-4"
              onClick={() => {/* 편집 페이지 이동 등 필요시 구현 */}}
            >
              <Play size={20} />
              Continue Editing
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4 mb-4"
            >
              <Play size={20} />
              Play Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailModal; 