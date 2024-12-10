import React, { useState } from 'react';
import { PhotoIcon, PaperAirplaneIcon, XMarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import AppLayout from './layout/AppLayout';

const MessageInput = ({ onClose, onSend }) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (message.trim() || selectedImage) {
      onSend({ text: message, image: selectedImage });
      setMessage('');
      setSelectedImage(null);
    }
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center p-4">
            <button onClick={onClose} className="mr-4">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="font-semibold">Maria</h2>
              <p className="text-xs text-gray-500">Usually responds within an hour</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 pb-40">
          {/* Demo messages */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-purple-100 rounded-lg p-3 max-w-[80%]">
                <p>Hi, I'm interested in your Banarasi silk saree</p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <p>Hello! Thank you for your interest. The saree is available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex items-center p-2 space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="message-image"
            />
            <label htmlFor="message-image" className="p-2">
              <PhotoIcon className="w-6 h-6 text-gray-500" />
            </label>
            
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setShowKeyboard(true)}
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none"
              />
              <button className="ml-2">
                <FaceSmileIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <button 
              onClick={handleSend}
              className={`p-2 rounded-full ${
                message.trim() || selectedImage 
                  ? 'text-purple-600' 
                  : 'text-gray-400'
              }`}
              disabled={!message.trim() && !selectedImage}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Virtual Keyboard */}
          {showKeyboard && (
            <div className="h-48 bg-gray-200 p-2 transition-all duration-300 ease-in-out">
              <div className="grid grid-cols-10 gap-1">
                {['Q','W','E','R','T','Y','U','I','O','P'].map((key) => (
                  <button 
                    key={key}
                    className="bg-white rounded p-2 text-center shadow"
                    onClick={() => setMessage(prev => prev + key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-9 gap-1 mt-1 ml-4">
                {['A','S','D','F','G','H','J','K','L'].map((key) => (
                  <button 
                    key={key}
                    className="bg-white rounded p-2 text-center shadow"
                    onClick={() => setMessage(prev => prev + key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-1 ml-8">
                {['Z','X','C','V','B','N','M'].map((key) => (
                  <button 
                    key={key}
                    className="bg-white rounded p-2 text-center shadow"
                    onClick={() => setMessage(prev => prev + key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="mt-1 flex justify-center">
                <button 
                  className="bg-white rounded p-2 w-1/2 text-center shadow"
                  onClick={() => setMessage(prev => prev + ' ')}
                >
                  space
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MessageInput;