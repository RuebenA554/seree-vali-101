import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, Cog6ToothIcon, PlusCircleIcon, VideoCameraIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, Cog6ToothIcon as Cog6ToothIconSolid, PlusCircleIcon as PlusCircleIconSolid, VideoCameraIcon as VideoCameraIconSolid, ChatBubbleLeftIcon as ChatBubbleLeftIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleUploadClick = () => {
    if (currentUser?.type !== 'seller') {
      navigate('/settings');
    } else {
      navigate('/upload');
    }
  };

  // Demo unread messages count
  const unreadMessages = 3;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-6 z-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      <div className="flex justify-between items-center">
        <button 
          onClick={handleHomeClick} 
          className="flex flex-col items-center"
        >
          {isActive('/') ? (
            <HomeIconSolid className="w-7 h-7 text-purple-600" />
          ) : (
            <HomeIcon className="w-7 h-7 text-gray-500" />
          )}
        </button>
        
        <button onClick={() => navigate('/settings')} className="flex flex-col items-center">
          {isActive('/settings') ? (
            <Cog6ToothIconSolid className="w-7 h-7 text-purple-600" />
          ) : (
            <Cog6ToothIcon className="w-7 h-7 text-gray-500" />
          )}
        </button>
        
        <button 
          onClick={handleUploadClick}
          className="flex flex-col items-center relative"
        >
          {isActive('/upload') ? (
            <PlusCircleIconSolid className="w-7 h-7 text-purple-600" />
          ) : (
            <PlusCircleIcon className="w-7 h-7 text-gray-500" />
          )}
          {currentUser?.type !== 'seller' && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              ⭐
            </span>
          )}
        </button>
        
        <button onClick={() => navigate('/reels')} className="flex flex-col items-center">
          {isActive('/reels') ? (
            <VideoCameraIconSolid className="w-7 h-7 text-purple-600" />
          ) : (
            <VideoCameraIcon className="w-7 h-7 text-gray-500" />
          )}
        </button>
        
        <button 
          onClick={() => navigate('/messages')}
          className="flex flex-col items-center relative"
        >
          {isActive('/messages') || location.pathname.includes('/messages/') ? (
            <ChatBubbleLeftIconSolid className="w-7 h-7 text-purple-600" />
          ) : (
            <ChatBubbleLeftIcon className="w-7 h-7 text-gray-500" />
          )}
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomNav;