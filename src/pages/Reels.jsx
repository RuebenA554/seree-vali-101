import React from 'react';
import AppLayout from '../components/layout/AppLayout';

const Reels = () => {
  const reels = [
    {
      id: 1,
      video: 'https://example.com/video1.mp4',
      user: 'SariQueen',
      description: 'Latest Banarasi Collection',
      likes: 1200
    }
  ];

  return (
    <AppLayout>
      <div className="h-full bg-black">
        <div className="relative h-full">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <p className="font-bold">@{reels[0].user}</p>
            <p className="text-sm">{reels[0].description}</p>
            <p className="text-sm mt-2">♥️ {reels[0].likes}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reels;