import React, { useState } from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import LikeButton from './LikeButton';
import ProductDetails from './ProductDetails';
import AppLayout from './layout/AppLayout';

const AppPreview = () => {
  const { posts, toggleLike, toggleSave } = usePosts();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    if (originalPrice && currentPrice) {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
    return 0;
  };

  const handleSellerClick = (e, username) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
  };

  if (selectedProduct) {
    return (
      <div className="bg-white min-h-full">
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-20">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
          onClick={() => setSelectedProduct(post)}
        >
          <div className="relative">
            <img 
              src={post.image} 
              className="w-full aspect-square object-cover" 
              alt={post.title}
            />
            {post.originalPrice && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                -{getDiscountPercentage(post.originalPrice, post.price)}% OFF
              </div>
            )}
            {currentUser?.type !== 'seller' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(post);
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow"
              >
                {post.isSaved ? (
                  <BookmarkSolid className="w-5 h-5 text-purple-600" />
                ) : (
                  <BookmarkOutline className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{post.title}</h3>
            
            <button 
              className="text-sm text-purple-600 mt-1"
              onClick={(e) => handleSellerClick(e, post.user.username)}
            >
              by {post.user.name}
            </button>

            {post.itemType === 'dress' && (
              <>
                <div className="text-xs text-gray-500 mt-1">
                  Region: {post.category}
                </div>
                <div className="text-xs text-gray-500">
                  Type: {post.dressType}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.sizes?.map(size => (
                    <span 
                      key={size} 
                      className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </>
            )}

            {post.itemType === 'saree' && (
              <>
                <div className="text-xs text-gray-500 mt-1">
                  Type: {post.dressType}
                </div>
                {post.location && (
                  <div className="text-xs text-gray-500">
                    From: {post.location}
                  </div>
                )}
              </>
            )}

            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarSolid
                    key={i}
                    className={`w-4 h-4 ${
                      i < (post.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs ml-1">
                ({post.reviews?.length || 0})
              </span>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-purple-600 text-lg font-bold">
                    ₹{post.price.toLocaleString()}
                  </span>
                  {post.originalPrice && (
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ₹{post.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <LikeButton 
                  isLiked={post.isLiked}
                  onLike={(e) => {
                    e.stopPropagation();
                    toggleLike(post.id);
                  }}
                  showCount={false}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppPreview;