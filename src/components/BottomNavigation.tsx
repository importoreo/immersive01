import React from 'react';
import { HomeIcon, SearchIcon, CreateIcon, ChatIcon, ProfileIcon } from './icons';
import { PageType } from '../types';

interface BottomNavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage, 
  onNavigate 
}) => {
  const navItems = [
    { key: 'home' as PageType, icon: HomeIcon, active: currentPage === 'home' },
    { key: 'discover' as PageType, icon: SearchIcon, active: currentPage === 'discover' },
    { key: 'create' as PageType, icon: CreateIcon, active: currentPage === 'create' },
    { key: 'chat' as PageType, icon: ChatIcon, active: currentPage === 'chat' },
    { key: 'profile' as PageType, icon: ProfileIcon, active: currentPage === 'profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black">
      <div className="flex justify-around items-center py-0 px-2.5 h-20">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`relative w-[66px] h-20 flex flex-col items-center justify-center cursor-pointer ${
                item.active 
                  ? 'bg-white/5 rounded-lg' 
                  : 'hover:bg-white/5 hover:rounded-lg'
              } transition-colors`}
            >
              <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center">
                <IconComponent active={item.active} />
              </div>
              {item.active && (
                <div className="absolute bottom-7 w-5 h-0.5 bg-white rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
      {/* Home indicator */}
      <div className="h-[34px] flex justify-center items-center">
        <div className="w-[133px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
}; 