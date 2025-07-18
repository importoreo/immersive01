import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ChatData } from '../types';

// Mock chat data
const mockChats: ChatData[] = [
  {
    id: '1',
    name: 'Alex Chen',
    type: 'private',
    avatar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    lastMessage: 'Love your latest AI character!',
    timestamp: '2m',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Sarah Kim',
    type: 'private',
    avatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    lastMessage: 'Thanks for the collaboration 🚀',
    timestamp: '15m',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Neon Cyberpunk Community',
    type: 'experience-group',
    avatar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    lastMessage: 'Player: "Amazing storyline!"',
    timestamp: '5m',
    unreadCount: 12,
    experienceTitle: 'Neon Cyberpunk Story',
    isOwner: true
  }
];

export const ChatPage: React.FC = () => {
  const [managedExpanded, setManagedExpanded] = useState(true);
  const [playingExpanded, setPlayingExpanded] = useState(true);

  const privateChats = mockChats.filter(chat => chat.type === 'private');
  const managedExperienceChats = mockChats.filter(chat => chat.type === 'experience-group' && chat.isOwner);
  const playingExperienceChats = mockChats.filter(chat => chat.type === 'experience-group' && !chat.isOwner);

  const handleChatClick = (chat: ChatData) => {
    console.log('Opening chat:', chat.name);
  };

  const ChatItem = ({ chat }: { chat: ChatData }) => (
    <div
      onClick={() => handleChatClick(chat)}
      className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer"
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
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <h1 className="text-white text-xl font-bold">Messages</h1>
      </div>

      {/* Chat Content */}
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
          >
            <h2 className="text-white/80 font-semibold text-sm flex items-center gap-2">
              <span className="text-yellow-400">👑</span>
              My Experience Communities
            </h2>
            {managedExpanded ? <ChevronUp size={16} className="text-white/60" /> : <ChevronDown size={16} className="text-white/60" />}
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
          >
            <h2 className="text-white/80 font-semibold text-sm flex items-center gap-2">
              <span className="text-blue-400">🎮</span>
              Playing Communities
            </h2>
            {playingExpanded ? <ChevronUp size={16} className="text-white/60" /> : <ChevronDown size={16} className="text-white/60" />}
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