import React, { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { ChatData, ChatClickHandler } from '../types';
import { mockChats } from '../data/mockData';

const ChatPage: React.FC = () => {
  const [managedExpanded, setManagedExpanded] = useState(true);
  const [playingExpanded, setPlayingExpanded] = useState(true);

  const privateChats = mockChats.filter(chat => chat.type === 'private');
  const managedExperienceChats = mockChats.filter(chat => chat.type === 'experience-group' && chat.isOwner);
  const playingExperienceChats = mockChats.filter(chat => chat.type === 'experience-group' && !chat.isOwner);

  const handleChatClick: ChatClickHandler = (chat) => {
    console.log('Opening chat:', chat.name);
  };

  const ChatItem: React.FC<{ chat: ChatData }> = ({ chat }) => (
    <div
      onClick={() => handleChatClick(chat)}
      className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`${chat.name}과의 채팅 열기`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleChatClick(chat);
        }
      }}
    >
      <div className="relative">
        <div 
          className="w-12 h-12 rounded-full"
          style={{
            backgroundImage: chat.avatar,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {chat.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-medium text-sm truncate">{chat.name}</p>
          <span className="text-white/60 text-xs">{chat.timestamp}</span>
        </div>
        {chat.experienceTitle && (
          <p className="text-white/50 text-xs mb-1 truncate">
            {chat.isOwner ? '👑 ' : '🎮 '}{chat.experienceTitle}
          </p>
        )}
        <p className="text-white/70 text-sm truncate">{chat.lastMessage}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <h1 className="text-white text-xl font-bold">Messages</h1>
      </div>

      <div className="absolute top-[115px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <div className="mb-6">
          <div className="px-4 py-2">
            <h2 className="text-white/80 font-semibold text-sm">Private Messages</h2>
          </div>
          <div className="px-1">
            {privateChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setManagedExpanded(!managedExpanded)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors"
            aria-label={`내 경험 커뮤니티 ${managedExpanded ? '접기' : '펼치기'}`}
          >
            <h2 className="text-white/80 font-semibold text-sm flex items-center gap-2">
              <span className="text-yellow-400">👑</span>
              My Experience Communities
            </h2>
            {managedExpanded ? <Icon name="FiChevronRight" size={16} className="text-white/60" /> : <Icon name="FiChevronLeft" size={16} className="text-white/60" />}
          </button>
          {managedExpanded && (
            <div className="px-1">
              {managedExperienceChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <button
            onClick={() => setPlayingExpanded(!playingExpanded)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors"
            aria-label={`플레이 중인 커뮤니티 ${playingExpanded ? '접기' : '펼치기'}`}
          >
            <h2 className="text-white/80 font-semibold text-sm flex items-center gap-2">
              <span className="text-blue-400">🎮</span>
              Playing Communities
            </h2>
            {playingExpanded ? <Icon name="FiChevronRight" size={16} className="text-white/60" /> : <Icon name="FiChevronLeft" size={16} className="text-white/60" />}
          </button>
          {playingExpanded && (
            <div className="px-1">
              {playingExperienceChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage; 