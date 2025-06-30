import React from 'react';

export const CreatePage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="absolute top-[107px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white text-[20px] font-bold text-center">
          Create Experience
        </h1>
      </div>

      {/* Content */}
      <div className="absolute top-[166px] left-[25px] w-[344px] space-y-5">
        <div className="text-white text-center">
          <p>Create new experiences here</p>
        </div>
      </div>
    </>
  );
}; 