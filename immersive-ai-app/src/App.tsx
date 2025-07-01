import React, { useState, useCallback, useMemo } from 'react';
import { PageType } from './types';
import { mockExperiences } from './data/mockData';
import StatusBar from './components/common/StatusBar';
import BottomNavigation from './components/navigation/BottomNavigation';
import FeedPage from './pages/FeedPage';
import CreatePage from './pages/CreatePage';
import DiscoverPage from './pages/DiscoverPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import { Icon } from './components/ui/Icon';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  const backgroundStyle = useMemo(() => ({
    background: `
      radial-gradient(ellipse at 281px 235.5px, 
        rgba(0,0,0,1) 0%, 
        rgba(5,4,12,1) 5%, 
        rgba(9,8,25,1) 10%, 
        rgba(19,17,50,1) 19%, 
        rgba(28,25,75,1) 28%, 
        rgba(38,33,100,1) 38%, 
        rgba(62,57,133,1) 56%, 
        rgba(86,80,167,1) 75%, 
        rgba(60,44,121,1) 87%, 
        rgba(47,26,97,1) 94%, 
        rgba(34,8,74,1) 100%
      )
    `,
  }), []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <FeedPage experiences={mockExperiences} />;
      case 'create':
        return <CreatePage />;
      case 'discover':
        return <DiscoverPage />;
      case 'chat':
        return <ChatPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <FeedPage experiences={mockExperiences} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div
        className="relative w-[393px] h-[852px] rounded-[40px] overflow-hidden"
        style={backgroundStyle}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(17, 76, 255, 0.2) 0%, rgba(17, 76, 255, 0.2) 100%),
              linear-gradient(135deg, rgba(0,13,63,0.2) 0%, transparent 50%)
            `,
            backdropFilter: 'blur(25px)',
          }}
        />

        <StatusBar />
        
        <main className="relative">
          {renderCurrentPage()}
        </main>

        <BottomNavigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
        />
      </div>
    </div>
  );
};

export default App;
