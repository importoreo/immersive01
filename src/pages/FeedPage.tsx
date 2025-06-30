import React from 'react';

export const FeedPage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4 z-10">
        <h1 className="text-white text-xl font-bold">Home</h1>
      </div>

      {/* Content */}
      <div className="absolute top-[115px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white text-lg font-semibold mb-4">Welcome to Feed</h2>
          <p className="text-white/70">This is the home feed page content.</p>
        </div>
      </div>
    </>
  );
}; 