import React from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const LikeButton = ({ isLiked, likes, onLike, showCount = true, size = "medium", className = '' }) => {
  const iconSize = size === "large" ? "w-7 h-7" : "w-5 h-5";
  
  return (
    <button 
      onClick={onLike} 
      className={`flex items-center space-x-1 ${className}`}
    >
      {isLiked ? (
        <HeartSolid className={`${iconSize} text-red-500`} />
      ) : (
        <HeartOutline className={iconSize} />
      )}
      {showCount && <span className="text-sm">{likes}</span>}
    </button>
  );
};

export default LikeButton;