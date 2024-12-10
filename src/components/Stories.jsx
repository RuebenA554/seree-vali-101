import React, { useState } from 'react';
import StoryViewer from './stories/StoryViewer';

const Stories = () => {
  const [activeStory, setActiveStory] = useState(null);
  
  const stories = [
    { 
      id: 1, 
      name: 'My Ads', 
      image: 'https://as2.ftcdn.net/v2/jpg/00/80/62/37/1000_F_80623732_8h6R0zvZVWTYHBBKqRHpqXmV0zFNrOJF.jpg',
      type: 'poll',
      question: 'Which saree design do you prefer?',
      options: ['Traditional', 'Modern'],
      isAdd: true 
    },
    { 
      id: 2, 
      name: 'SilkQueen', 
      image: 'https://as2.ftcdn.net/v2/jpg/00/87/92/39/1000_F_87923962_bQQWAD3VILBUxwrJrGHQBZX0qQGh4rgJ.jpg',
      type: 'quiz',
      question: 'What type of silk is this saree?',
      options: ['Banarasi', 'Kanjivaram', 'Mysore', 'Dharmavaram']
    },
    { 
      id: 3, 
      name: 'SariLover', 
      image: 'https://as1.ftcdn.net/v2/jpg/00/94/55/07/1000_F_94550772_qTGveZwFeacXmvLkDkXz7R3qD1C8vwDi.jpg',
      type: 'countdown',
      title: 'Flash Sale',
      endsIn: '02:00:00'
    },
    { 
      id: 4, 
      name: 'Elegance', 
      image: 'https://as2.ftcdn.net/v2/jpg/00/80/62/37/1000_F_80623732_8h6R0zvZVWTYHBBKqRHpqXmV0zFNrOJF.jpg',
      type: 'question',
      question: 'What occasion would you wear this for?'
    }
  ];

  return (
    <div className="bg-white">
      <div className="flex space-x-4 px-4 py-4 overflow-x-auto hide-scrollbar">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-1 flex-shrink-0"
            onClick={() => setActiveStory(story)}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5">
                <div className="bg-white rounded-full p-0.5">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {story.isAdd && (
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-lg border-2 border-white">
                      +
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 truncate w-16 text-center">{story.name}</span>
          </div>
        ))}
      </div>

      {activeStory && (
        <StoryViewer 
          story={activeStory} 
          onClose={() => setActiveStory(null)} 
        />
      )}
    </div>
  );
};

export default Stories;