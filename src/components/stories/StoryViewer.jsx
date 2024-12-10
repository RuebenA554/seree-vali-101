import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClose = useCallback(() => {
    if (progress >= 100) {
      onClose();
    }
  }, [progress, onClose]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
          handleClose();
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [handleClose]);

  const renderStoryContent = () => {
    switch (story.type) {
      case 'poll':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-xl max-w-xs w-full">
              <h3 className="text-lg font-semibold mb-4">{story.question}</h3>
              <div className="space-y-3">
                {story.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full p-3 rounded-lg border ${
                      selectedOption === option
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-xl max-w-xs w-full">
              <h3 className="text-lg font-semibold mb-4">{story.question}</h3>
              <div className="space-y-3">
                {story.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full p-3 rounded-lg border ${
                      selectedOption === option
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'countdown':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
              <div className="text-2xl font-bold text-purple-600">
                {story.endsIn}
              </div>
            </div>
          </div>
        );

      case 'question':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-xl max-w-xs w-full">
              <h3 className="text-lg font-semibold mb-4">{story.question}</h3>
              <input
                type="text"
                placeholder="Type your answer..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-1 bg-gray-700">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="relative h-full">
        <img 
          src={story.image} 
          alt={story.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center">
          <img 
            src={story.image} 
            alt={story.name} 
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span className="ml-2 text-white font-semibold">{story.name}</span>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {renderStoryContent()}
      </div>
    </div>
  );
};

export default StoryViewer;