import React from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/solid';

const ProfilePostGrid = ({ posts }) => {
  const getImageUrl = (id) => {
    const images = [
      'https://images.unsplash.com/photo-1583391099995-0ad131cb03f9?w=800', // Silk Saree
      'https://images.unsplash.com/photo-1583391099931-0e8bed3c0175?w=800', // Wedding Saree
      'https://images.unsplash.com/photo-1583391099888-31e1c23f4942?w=800', // Traditional Saree
      'https://images.unsplash.com/photo-1628168108107-d6539e7a7720?w=800', // Designer Saree
      'https://images.unsplash.com/photo-1623002071765-5a769c13857f?w=800', // Party Wear
      'https://images.unsplash.com/photo-1623002108097-c6c7d4e0d5cf?w=800', // Festive Saree
      'https://images.unsplash.com/photo-1623002089226-19a14c2cf1b1?w=800', // Bridal Saree
      'https://images.unsplash.com/photo-1623002071634-7a162c853c71?w=800', // Casual Saree
      'https://images.unsplash.com/photo-1623002071153-dc6d5c9b6672?w=800'  // Modern Saree
    ];
    return images[id % images.length];
  };

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-square">
          <img
            src={getImageUrl(post.id)}
            alt={`Saree ${post.id}`}
            className="w-full h-full object-cover"
          />
          {post.type === 'video' && (
            <div className="absolute top-2 right-2">
              <VideoCameraIcon className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
            <p className="text-white text-xs font-semibold">₹{post.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePostGrid;