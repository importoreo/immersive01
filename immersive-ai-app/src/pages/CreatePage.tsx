import React from 'react';
import { Icon } from '../components/ui/Icon';

const CreatePage: React.FC = () => {
  const handleExperienceClick = (type: string) => {
    console.log(`Selected: ${type}`);
  };

  const ExperienceButton: React.FC<{
    title: string;
    icon: React.ReactNode;
    backgroundImage: string;
    onClick?: () => void;
  }> = ({ title, icon, backgroundImage, onClick }) => (
    <div 
      onClick={onClick} 
      className="relative h-[120px] rounded-[20px] overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] border border-white/50 shadow-lg backdrop-blur-[20px]"
      style={{ 
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), ${backgroundImage}`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
      role="button"
      tabIndex={0}
      aria-label={`${title} 생성하기`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      <div className="relative h-full flex items-center px-10">
        <div className="flex items-center gap-3">
          <div className="text-white/90 shrink-0">{icon}</div>
          <h3 className="text-white text-[20px] font-bold drop-shadow-lg" style={{ textShadow: '#000000 0px 2px 5px' }}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="absolute top-[107px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white text-[20px] font-bold text-center">Create Experience</h1>
      </div>
      <div className="absolute top-[166px] left-[25px] w-[344px] space-y-5">
        <ExperienceButton
          title="Visual Story"
          icon={<Icon name="FiImage" size={20} />}
          backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          onClick={() => handleExperienceClick('Visual Story')}
        />
        <ExperienceButton
          title="Interactive World"
          icon={<Icon name="FiHeadphones" size={24} />}
          backgroundImage="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          onClick={() => handleExperienceClick('Interactive World')}
        />
        <ExperienceButton
          title="AI Character"
          icon={<Icon name="FiActivity" size={24} />}
          backgroundImage="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          onClick={() => handleExperienceClick('AI Character')}
        />
      </div>
    </>
  );
};

export default CreatePage; 