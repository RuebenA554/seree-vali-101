import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SharePanel = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  const handleShare = (platform) => {
    // Implement sharing logic for each platform
    console.log(`Sharing to ${platform}`);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-x-0 bottom-0 transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      <div className="bg-white rounded-t-xl shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Share</h3>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { name: 'WhatsApp', icon: '📱' },
              { name: 'Facebook', icon: '📘' },
              { name: 'Instagram', icon: '📸' },
              { name: 'Messages', icon: '💬' }
            ].map((platform) => (
              <button 
                key={platform.name}
                onClick={() => handleShare(platform.name.toLowerCase())}
                className="flex flex-col items-center"
              >
                <span className="text-2xl mb-1">{platform.icon}</span>
                <span className="text-xs">{platform.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleShare('my-ads')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold mb-3"
          >
            Share to My Ads
          </button>

          <button
            onClick={() => handleShare('messages')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
          >
            Share via Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePanel;