import React, { useState } from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import LikeButton from './LikeButton';
import SaveToCollectionModal from './SaveToCollectionModal';

const Feed = () => {
  const { addToCart } = useCart();
  const { posts, toggleLike, toggleSave } = usePosts();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleAddToCart = (post, event) => {
    event.stopPropagation();
    addToCart(post);
    setAddedToCart(prev => ({ ...prev, [post.id]: true }));
  };

  const handleLikeClick = (postId, event) => {
    event.stopPropagation();
    toggleLike(postId);
  };

  const handlePostClick = (post) => {
    navigate(`/profile/${post.user.username}`, {
      state: { selectedPostId: post.id }
    });
  };

  const handleSaveClick = (post, event) => {
    event.stopPropagation();
    setSelectedPost(post);
    setShowSaveModal(true);
  };

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / reviews.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="relative">
              <img 
                src={post.image} 
                className="w-full aspect-square object-cover" 
                alt={post.title}
              />
              {currentUser?.type !== 'seller' && (
                <button 
                  onClick={(e) => handleSaveClick(post, e)}
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
                <div className="text-xs text-gray-500 mt-1">
                  Type: {post.dressType}
                </div>
              )}

              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarSolid
                      key={i}
                      className={`w-4 h-4 ${
                        i < getAverageRating(post.reviews) ? 'text-yellow-400' : 'text-gray-300'
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
                  <span className="text-purple-600 text-lg font-bold">₹{post.price.toLocaleString()}</span>
                  <LikeButton 
                    isLiked={post.isLiked}
                    onLike={(e) => handleLikeClick(post.id, e)}
                    showCount={false}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSaveModal && selectedPost && (
        <SaveToCollectionModal
          post={selectedPost}
          onClose={() => {
            setShowSaveModal(false);
            setSelectedPost(null);
          }}
        />
      )}
    </>
  );
};

export default Feed;