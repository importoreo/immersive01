import React from 'react';
import { PageType, NavigationHandler } from '../../types';
import { Icon } from '../ui/Icon';

interface BottomNavigationProps {
  currentPage: PageType;
  onNavigate: NavigationHandler;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage, 
  onNavigate 
}) => {
  const navItems = [
    { 
      key: 'home' as PageType, 
      iconName: 'Home' as const, 
      active: currentPage === 'home', 
      onClick: () => onNavigate('home') 
    },
    { 
      key: 'discover' as PageType, 
      iconName: 'Search' as const, 
      active: currentPage === 'discover', 
      onClick: () => onNavigate('discover') 
    },
    { 
      key: 'create' as PageType, 
      iconName: 'Plus' as const, 
      active: currentPage === 'create', 
      onClick: () => onNavigate('create') 
    },
    { 
      key: 'chat' as PageType, 
      iconName: 'MessageCircle' as const, 
      active: currentPage === 'chat', 
      onClick: () => onNavigate('chat') 
    },
    { 
      key: 'profile' as PageType, 
      iconName: 'User' as const, 
      active: currentPage === 'profile', 
      onClick: () => onNavigate('profile') 
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black">
      <div className="flex justify-around items-center py-0 px-2.5 h-20">
        {navItems.map((item) => (
          <div
            key={item.key}
            onClick={item.onClick}
            className={`relative w-[66px] h-20 flex flex-col items-center justify-center cursor-pointer ${
              item.active 
                ? 'bg-white/5 rounded-lg' 
                : 'hover:bg-white/5 hover:rounded-lg'
            } transition-colors`}
            role="button"
            tabIndex={0}
            aria-label={`${item.key} 페이지로 이동`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center">
              <Icon 
                name={item.iconName} 
                size={24} 
                className={item.active ? 'text-white' : 'text-white/60'} 
              />
            </div>
            {item.active && (
              <div className="absolute bottom-7 w-5 h-0.5 bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      <div className="h-[34px] flex justify-center items-center">
        <div className="w-[133px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default BottomNavigation; 