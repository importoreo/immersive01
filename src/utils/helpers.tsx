import React from 'react';
import { Image, Headphones, Bot, Play } from 'lucide-react';

export const getTypeIcon = (type: string): React.ReactElement => {
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

export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'visual-story':
      return 'from-purple-500 to-blue-500';
    case 'interactive-world':
      return 'from-pink-500 to-red-500';
    case 'ai-character':
      return 'from-blue-500 to-cyan-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getCreatorTypeLabel = (type: string): string => {
  switch (type) {
    case 'visual-story': return 'Storyteller';
    case 'interactive-world': return 'World Builder';
    case 'ai-character': return 'AI Architect';
    default: return 'Creator';
  }
}; 