import React from 'react';
import { Icon } from '../components/ui/Icon';

const DiscoverPage: React.FC = () => {
  const discoverItems = [
    [
      { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: <Icon name="FiActivity" size={16} />, size: 'small' as const },
      { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: <Icon name="FiImage" size={16} />, size: 'medium' as const },
      { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: <Icon name="FiPlay" size={16} />, size: 'large' as const }
    ],
    [
      { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', icon: <Icon name="FiImage" size={16} />, size: 'large' as const },
      { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: <Icon name="FiActivity" size={16} />, size: 'small' as const },
      { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', icon: <Icon name="FiPlay" size={16} />, size: 'medium' as const }
    ],
    [
      { bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', icon: <Icon name="FiCamera" size={16} />, size: 'medium' as const },
      { bg: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)', icon: <Icon name="FiActivity" size={16} />, size: 'small' as const },
      { bg: 'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)', icon: <Icon name="FiImage" size={16} />, size: 'large' as const }
    ]
  ];

  const DiscoverCard: React.FC<{
    backgroundImage: string;
    icon: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    onClick?: () => void;
  }> = ({ backgroundImage, icon, size, onClick }) => {
    const heights = {
      small: 'h-[130px]',
      medium: 'h-[180px]', 
      large: 'h-[230px]'
    };

    return (
      <div
        onClick={onClick}
        className={`relative w-full ${heights[size]} rounded-[15px] overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] border border-white/30 shadow-lg backdrop-blur-[15px] mb-2.5`}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), ${backgroundImage}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="button"
        tabIndex={0}
        aria-label="발견 항목 보기"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm">
          <div className="text-white/90 text-sm">
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="absolute top-[75px] left-0 right-0">
        <div className="mx-4 mb-4">
          <div className="relative bg-white/10 rounded-full border border-white/20 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center gap-3">
              <Icon name="FiSearch" size={20} className="text-white/60" />
              <input
                type="text"
                placeholder="Search anything.."
                className="flex-1 bg-transparent text-white placeholder-white/40 text-base outline-none"
                aria-label="검색"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-[142px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <div className="flex gap-2.5 px-4">
          {discoverItems.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col">
              {column.map((item, itemIndex) => (
                <DiscoverCard
                  key={`${columnIndex}-${itemIndex}`}
                  backgroundImage={item.bg}
                  icon={item.icon}
                  size={item.size}
                  onClick={() => console.log(`Clicked item ${columnIndex}-${itemIndex}`)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DiscoverPage; 