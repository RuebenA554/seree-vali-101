import React from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img 
            src={post.userAvatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 font-semibold">{post.username}</span>
        </div>
        <button className="text-gray-500">•••</button>
      </div>

      <div className="relative">
        <img 
          src={post.image} 
          alt="Post content"
          className="w-full aspect-square object-cover"
        />
        {post.type === 'reel' && (
          <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded">
            <span className="text-white text-sm">Reel</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <HeartIcon className="w-7 h-7" />
            <ChatBubbleLeftIcon className="w-7 h-7" />
            <ShareIcon className="w-7 h-7" />
          </div>
          <BookmarkIcon className="w-7 h-7" />
        </div>
        <p className="font-semibold">{post.likes} likes</p>
        <p>
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          View all {post.comments} comments
        </p>
        <p className="font-bold text-purple-600 mt-2">₹{post.price}</p>
      </div>

      <div className="px-3 pb-3">
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PostCard;