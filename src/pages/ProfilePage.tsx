import React from 'react';

export const ProfilePage: React.FC = () => {
  return (
    <>
      {/* Profile Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-bold">Profile</h1>
          <button className="text-white/60 hover:text-white transition-colors">
            ⚙️
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full border-3 border-white/20 bg-gradient-to-br from-purple-500 to-blue-500"></div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">Digital Creator</h2>
            <p className="text-white/60 text-sm">@digital_creator</p>
          </div>
        </div>

        <p className="text-white/80 text-sm mb-4">Creating immersive digital experiences 🚀✨</p>

        {/* Stats */}
        <div className="flex justify-around bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="text-center">
            <p className="text-white font-bold text-lg">24</p>
            <p className="text-white/60 text-xs">Experiences</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">12.5K</p>
            <p className="text-white/60 text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">847</p>
            <p className="text-white/60 text-xs">Following</p>
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="absolute top-[340px] left-0 right-0 bottom-[114px] overflow-y-auto px-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 border border-white/20"></div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-red-500 border border-white/20"></div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 border border-white/20"></div>
        </div>
      </div>
    </>
  );
}; 