import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import AppLayout from './layout/AppLayout';
import CustomOffer from './CustomOffer';

const ReviewModal = ({ post, onClose, onReplySubmit }) => {
  const { currentUser } = useAuth();
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleReplySubmit = (reviewId) => {
    if (replyText.trim()) {
      onReplySubmit(reviewId, replyText);
      setReplyText('');
      setActiveReplyId(null);
    }
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || !newReview.trim()) return;
    // Add review submission logic here
    setNewReview('');
    setRating(0);
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center p-4">
            <button onClick={onClose} className="mr-4">
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Reviews</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="ml-4">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-purple-600 font-bold">₹{post.price.toLocaleString()}</p>
              {post.originalPrice && (
                <p className="text-gray-500 line-through">
                  ₹{post.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            {post.reviews?.map((review, index) => (
              <div key={index} className="border-b last:border-b-0 pb-4">
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
                
                {currentUser?.type === 'seller' && (
                  <div className="mt-2">
                    {activeReplyId === review.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          rows="2"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleReplySubmit(review.id)}
                            className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => {
                              setActiveReplyId(null);
                              setReplyText('');
                            }}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReplyId(review.id)}
                        className="text-purple-600 text-sm"
                      >
                        Reply to review
                      </button>
                    )}
                  </div>
                )}

                {review.replies?.map((reply, replyIndex) => (
                  <div key={replyIndex} className="ml-6 mt-2 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="ml-2 text-sm font-medium">{reply.user.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{reply.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add Review Section */}
          {currentUser?.type !== 'seller' && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold mb-2">Write a Review</h3>
              <div className="flex mb-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredRating(index + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(index + 1)}
                  >
                    <StarSolid
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
          )}

          {/* Custom Offer Section */}
          {currentUser?.type === 'seller' && (
            <div className="mt-6 border-t pt-4">
              <CustomOffer product={post} onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReviewModal;