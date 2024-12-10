import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChatBubbleLeftIcon, StarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import AppLayout from '../components/layout/AppLayout';
import { useCart } from '../context/CartContext';
import { usePosts } from '../context/PostContext';
import LikeButton from '../components/LikeButton';

const BuyerProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, toggleLike, addReview } = usePosts();
  const { addToCart } = useCart();
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    if (location.state?.selectedPostId) {
      setSelectedPost(location.state.selectedPostId);
      setShowReviews(true);
    }
  }, [location.state]);

  const sellerPosts = posts.filter(post => post.user?.username === username) || [];
  const currentPost = selectedPost ? posts.find(p => p.id === selectedPost) : null;

  const orderedPosts = [...sellerPosts];
  if (selectedPost) {
    const selectedIndex = orderedPosts.findIndex(p => p.id === selectedPost);
    if (selectedIndex > 0) {
      const [selected] = orderedPosts.splice(selectedIndex, 1);
      orderedPosts.unshift(selected);
    }
  }

  const handleAddToCart = (post) => {
    addToCart(post);
    setAddedToCart(prev => ({ ...prev, [post.id]: true }));
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || !newReview.trim()) return;

    addReview(selectedPost, {
      rating,
      text: newReview,
      timestamp: new Date().toISOString()
    });

    setNewReview('');
    setRating(0);
  };

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / reviews.length);
  };

  if (!sellerPosts.length) {
    navigate('/');
    return null;
  }

  const seller = sellerPosts[0].user;

  if (showReviews && currentPost) {
    return (
      <AppLayout>
        <div className="min-h-full bg-white">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center p-4">
              <button onClick={() => setShowReviews(false)} className="mr-4">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Reviews</h1>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center mb-4">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-4">
                <h2 className="font-semibold">{currentPost.title}</h2>
                <p className="text-purple-600 font-bold">₹{currentPost.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-4">
              {currentPost.reviews?.length > 0 ? (
                currentPost.reviews.map((review, index) => (
                  <div key={index} className="mb-3 pb-3 border-b last:border-b-0">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Write a Review</h3>
              <div className="flex mb-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredRating(index + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(index + 1)}
                  >
                    <StarIcon
                      className={`w-6 h-6 ${
                        index < (hoveredRating || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
              />
              
              <button
                onClick={handleReviewSubmit}
                disabled={!rating || !newReview.trim()}
                className="w-full py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pb-20">
        <div className="p-4">
          <div className="flex items-center">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover"
            />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{seller.name}</h1>
              <p className="text-gray-600">@{seller.username}</p>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <button 
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center"
              onClick={() => navigate(`/messages/${seller.username}`)}
            >
              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
              Message
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {orderedPosts.map((post) => (
            <div 
              key={post.id} 
              className={`bg-white rounded-lg shadow overflow-hidden ${
                post.id === selectedPost ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-square object-cover"
                onClick={() => {
                  setSelectedPost(post.id);
                  setShowReviews(true);
                }}
              />
              
              <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                
                {post.itemType === 'dress' && post.sizes && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.sizes.map(size => (
                      <span 
                        key={size} 
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}

                {post.itemType && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      {post.itemType === 'dress' ? `${post.category} - ${post.dressType}` : post.dressType}
                    </span>
                  </div>
                )}

                <div className="mt-2 item-card">
                  <span className="price text-lg font-bold">₹{post.price.toLocaleString()}</span>
                  <div className="flex items-center justify-between">
                    <LikeButton 
                      isLiked={post.isLiked}
                      onLike={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                      }}
                      showCount={false}
                    />
                    <button
                      onClick={() => handleAddToCart(post)}
                      className={`add-to-cart ${addedToCart[post.id] ? 'added' : ''}`}
                    >
                      {addedToCart[post.id] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default BuyerProfile;