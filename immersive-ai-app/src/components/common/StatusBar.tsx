import React from 'react';

const StatusBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center pt-3 px-4 text-white text-sm font-semibold">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1.5 bg-white rounded-full"></div>
          <div className="w-1 h-2 bg-white rounded-full"></div>
          <div className="w-1 h-2.5 bg-white rounded-full"></div>
        </div>
        <div className="w-3 h-2 relative ml-1">
          <div className="absolute inset-0 border border-white rounded-sm opacity-40"></div>
        </div>
        <div className="border border-white/40 rounded-sm w-6 h-3 relative ml-1">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/40 rounded-r-sm -mr-0.5"></div>
          <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1 bg-white rounded-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar; 