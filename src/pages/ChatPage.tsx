import React from 'react';

export const ChatPage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="absolute top-[75px] left-0 right-0 px-4">
        <h1 className="text-white text-xl font-bold">Messages</h1>
      </div>

      {/* Chat Content */}
      <div className="absolute top-[115px] left-0 right-0 bottom-[114px] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white text-lg font-semibold mb-4">Chat</h2>
          <p className="text-white/70">Your messages will appear here</p>
        </div>
      </div>
    </>
  );
}; 