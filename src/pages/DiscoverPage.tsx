import React from 'react';

export const DiscoverPage: React.FC = () => {
  return (
    <>
      <div className="absolute top-[75px] left-0 right-0">
        <div className="mx-4 mb-4">
          <div className="relative bg-white/10 rounded-full border border-white/20 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="text-white/60">🔍</div>
              <input
                type="text"
                placeholder="Search anything.."
                className="flex-1 bg-transparent text-white placeholder-white/40 text-base outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-[142px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white text-lg font-semibold mb-4">Discover</h2>
          <p className="text-white/70">Discover new experiences here</p>
        </div>
      </div>
    </>
  );
}; 