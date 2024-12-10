import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import AppLayout from '../components/layout/AppLayout';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import SavedCollections from '../components/SavedCollections';
import ReviewModal from '../components/ReviewModal';
import { shareContent } from '../utils/sharing';

const Profile = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const navigate = useNavigate();
  const { posts, toggleLike, addReviewReply } = usePosts();
  const { currentUser } = useAuth();

  // Filter posts for the current user
  const userPosts = posts.filter(post => post.user?.username === currentUser?.username);

  const handleReviewClick = (post) => {
    setSelectedPost(post);
    setShowReviewModal(true);
  };

  const handleReplySubmit = (reviewId, replyText) => {
    if (selectedPost && replyText.trim()) {
      addReviewReply(selectedPost.id, reviewId, {
        text: replyText,
        timestamp: new Date().toISOString(),
        user: {
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      });
    }
  };

  const handleShare = async (post, e) => {
    e.stopPropagation();
    await shareContent(post);
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    if (originalPrice && currentPrice) {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
    return 0;
  };

  if (showReviewModal && selectedPost) {
    return (
      <ReviewModal
        post={selectedPost}
        onClose={() => {
          setShowReviewModal(false);
          setSelectedPost(null);
        }}
        onReplySubmit={handleReplySubmit}
        isSeller={currentUser?.type === 'seller'}
      />
    );
  }

  return (
    <AppLayout>
      <div className="pb-20">
        {/* Profile Header */}
        <div className="p-4">
          <div className="flex items-center">
            <img
              src={currentUser?.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{currentUser?.name}</h1>
              <p className="text-gray-600">@{currentUser?.username}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <button 
              className="flex-1 bg-gray-100 py-2 rounded-lg font-semibold text-sm"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
            </button>
            <button 
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center"
              onClick={() => navigate('/messages')}
            >
              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
              Messages
            </button>
          </div>
        </div>

        {/* Content */}
        {currentUser?.type === 'seller' ? (
          <div className="grid grid-cols-2 gap-4 p-4">
            {userPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                onClick={() => handleReviewClick(post)}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-square object-cover"
                  />
                  {post.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      -{getDiscountPercentage(post.originalPrice, post.price)}% OFF
                    </div>
                  )}
                  <button
                    onClick={(e) => handleShare(post, e)}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow"
                  >
                    <ShareIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                  <div className="mt-1">
                    <span className="text-purple-600 font-bold">₹{post.price.toLocaleString()}</span>
                    {post.originalPrice && (
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ₹{post.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Reviews: {post.reviews?.length || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SavedCollections />
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;