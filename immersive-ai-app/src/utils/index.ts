import { ExperienceType, Difficulty } from '../types';

// 숫자 포맷팅
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// 날짜 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '오늘';
  if (diffDays === 2) return '어제';
  if (diffDays <= 7) return `${diffDays - 1}일 전`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)}개월 전`;
  
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// 시간 포맷팅
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
};

// 경험 타입에 따른 아이콘 색상
export const getExperienceTypeColor = (type: ExperienceType): string => {
  switch (type) {
    case 'visual-story':
      return 'text-purple-400';
    case 'interactive-world':
      return 'text-pink-400';
    case 'ai-character':
      return 'text-blue-400';
    default:
      return 'text-white';
  }
};

// 난이도에 따른 색상
export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400';
    case 'Medium':
      return 'text-yellow-400';
    case 'Hard':
      return 'text-red-400';
    default:
      return 'text-white';
  }
};

// 난이도에 따른 배경 색상
export const getDifficultyBgColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 border-green-400/20';
    case 'Medium':
      return 'bg-yellow-500/20 border-yellow-400/20';
    case 'Hard':
      return 'bg-red-500/20 border-red-400/20';
    default:
      return 'bg-white/10 border-white/20';
  }
};

// 그라디언트 배경 생성
export const createGradient = (startColor: string, endColor: string): string => {
  return `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`;
};

// 랜덤 그라디언트 생성
export const getRandomGradient = (): string => {
  const gradients = [
    createGradient('#667eea', '#764ba2'),
    createGradient('#f093fb', '#f5576c'),
    createGradient('#4facfe', '#00f2fe'),
    createGradient('#a8edea', '#fed6e3'),
    createGradient('#ff9a9e', '#fecfef'),
    createGradient('#ffecd2', '#fcb69f'),
    createGradient('#89f7fe', '#66a6ff'),
    createGradient('#fdbb2d', '#22c1c3'),
    createGradient('#e0c3fc', '#9bb5ff'),
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// 로컬 스토리지 유틸리티
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// 디바운스 함수
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 쓰로틀 함수
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 클래스명 조합
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// 에러 처리
export const handleError = (error: unknown, context?: string): void => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  // 여기에 에러 리포팅 서비스 연동 가능
};

// 성능 측정
export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  }) as T;
};

// 유효성 검사
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  required: (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  }
};

// 배열 유틸리티
export const arrayUtils = {
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },
  
  unique: <T>(array: T[]): T[] => {
    return Array.from(new Set(array));
  },
  
  groupBy: <T, K extends keyof any>(array: T[], key: (item: T) => K): Record<K, T[]> => {
    return array.reduce((groups, item) => {
      const group = key(item);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  }
}; 