import React, { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { BottomNavigation } from './components/BottomNavigation';
import { FeedPage } from './pages/FeedPage';
import { CreatePage } from './pages/CreatePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { PageType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <FeedPage />;
      case 'create':
        return <CreatePage />;
      case 'discover':
        return <DiscoverPage />;
      case 'chat':
        return <ChatPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="relative w-[393px] h-[852px] rounded-[40px] overflow-hidden app-background">
        {/* Background overlay */}
        <div className="absolute inset-0 app-overlay" />

        <StatusBar />
        
        {renderPage()}

        <BottomNavigation 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
        />
      </div>
    </div>
  );
}

export default App; 