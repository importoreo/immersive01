import React from 'react';

interface IconProps {
  active?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ active = false }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill={active ? "white" : "rgba(255,255,255,0.6)"}>
    <path d="M9.06 0.1C9 0.04 8.9 0 8.81 0C8.71 0 8.62 0.04 8.55 0.1L0.11 8.16C0.08 8.2 0.05 8.24 0.03 8.28C0.01 8.33 0 8.38 0 8.43V15.99C0 16.38 0.15 16.76 0.43 17.03C0.7 17.31 1.08 17.46 1.47 17.46H5.87C6.07 17.46 6.25 17.38 6.39 17.24C6.53 17.1 6.6 16.92 6.6 16.73V10.49C6.6 10.4 6.64 10.3 6.71 10.23C6.78 10.16 6.87 10.13 6.97 10.13H10.64C10.74 10.13 10.83 10.16 10.9 10.23C10.97 10.3 11 10.4 11 10.49V16.73C11 16.92 11.08 17.1 11.22 17.24C11.36 17.38 11.54 17.46 11.74 17.46H16.14C16.53 17.46 16.9 17.31 17.18 17.03C17.45 16.76 17.61 16.38 17.61 15.99V8.43C17.61 8.38 17.6 8.33 17.58 8.28C17.56 8.24 17.53 8.2 17.49 8.16L9.06 0.1Z"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill={active ? "white" : "rgba(255,255,255,0.6)"}>
    <path d="M19.16 17.5L14.75 13.09C15.81 11.68 16.38 9.96 16.38 8.19C16.38 3.67 12.71 0 8.19 0C3.67 0 0 3.67 0 8.19C0 12.71 3.67 16.38 8.19 16.38C9.96 16.38 11.68 15.81 13.09 14.75L17.5 19.16C17.73 19.36 18.02 19.46 18.32 19.46C18.62 19.45 18.9 19.32 19.11 19.11C19.32 18.9 19.45 18.62 19.46 18.32C19.46 18.02 19.36 17.73 19.16 17.5ZM2.34 8.19C2.34 7.03 2.68 5.9 3.33 4.94C3.97 3.98 4.88 3.23 5.95 2.79C7.02 2.34 8.2 2.23 9.33 2.45C10.47 2.68 11.51 3.24 12.33 4.05C13.14 4.87 13.7 5.91 13.93 7.05C14.15 8.18 14.04 9.36 13.59 10.43C13.15 11.5 12.4 12.41 11.44 13.05C10.48 13.7 9.35 14.04 8.19 14.04C6.64 14.04 5.15 13.42 4.06 12.32C2.96 11.23 2.34 9.74 2.34 8.19Z"/>
  </svg>
);

export const CreateIcon: React.FC<IconProps> = ({ active = false }) => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill={active ? "white" : "rgba(255,255,255,0.6)"}>
    <path d="M11,2V20" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    <path d="M20,11H2" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ active = false }) => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill={active ? "white" : "rgba(255,255,255,0.6)"}>
    <path d="M22 9.38C22 14.55 17.07 18.75 11 18.75C9.91 18.75 8.83 18.62 7.77 18.34C6.97 18.74 5.13 19.5 2.02 20C1.75 20.04 1.54 19.76 1.65 19.51C2.14 18.39 2.58 16.9 2.71 15.54C1.02 13.89 0 11.73 0 9.38C0 4.2 4.93 0 11 0C17.07 0 22 4.2 22 9.38Z"/>
  </svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ active = false }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeWidth="1.5" fill="none"/>
    <circle cx="11" cy="8" r="3" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeWidth="1.5" fill="none"/>
    <path d="M3.27 17.35S5.5 14.5 11 14.5S18.73 17.35 18.73 17.35" stroke={active ? "white" : "rgba(255,255,255,0.6)"} strokeWidth="1.5"/>
  </svg>
); 