import React from 'react';
import Navbar from '../Navbar';
import BottomNav from '../BottomNav';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative max-w-[390px] w-full h-[844px] bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-800">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-black rounded-b-3xl z-50"></div>
        
        {/* Status Bar */}
        <div className="h-6 bg-white"></div>
        
        {/* Content Container */}
        <div className="relative h-[calc(100%-1.5rem)] flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto hide-scrollbar bg-white">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;