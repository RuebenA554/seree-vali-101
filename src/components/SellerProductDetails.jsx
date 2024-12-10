```jsx
import React, { useState } from 'react';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import SharePanel from './SharePanel';

const SellerProductDetails = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { updateOffer } = usePosts();
  const { currentUser } = useAuth();
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [offerDetails, setOfferDetails] = useState({
    originalPrice: product.originalPrice || product.price,
    newPrice: product.price,
    percentage: product.originalPrice ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  });

  const handlePriceChange = (value) => {
    const newPrice = parseInt(value);
    const percentage = Math.round(((offerDetails.originalPrice - newPrice) / offerDetails.originalPrice) * 100);
    setOfferDetails({ ...offerDetails, newPrice, percentage });
  };

  const handlePercentageChange = (value) => {
    const percentage = parseInt(value);
    const newPrice = Math.round(offerDetails.originalPrice * (1 - percentage / 100));
    setOfferDetails({ ...offerDetails, newPrice, percentage });
  };

  const handleSaveOffer = () => {
    updateOffer(product.id, offerDetails.newPrice, offerDetails.originalPrice);
    alert('Offer updated successfully!');
  };

  return (
    <div className="bg-white min-h-full">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center p-4">
          <button onClick={onClose} className="mr-4">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Product Details</h1>
        </div>
      </div>

      <div className="p-4 pb-32">
        <img
          src={product.image}
          alt={product.title}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarSolid
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Custom Offer Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Create Custom Offer</h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={offerDetails.originalPrice}
                onChange={(e) => setOfferDetails({
                  ...offerDetails,
                  originalPrice: parseInt(e.target.value)
                })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Offer Price (₹)
              </label>
              <input
                type="number"
                value={offerDetails.newPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                value={offerDetails.percentage}
                onChange={(e) => handlePercentageChange(e.target.value)}
                className="w-full p-2 border rounded-lg"
                min="0"
                max="100"
              />
            </div>

            <button
              onClick={handleSaveOffer}
              className="w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Save Offer
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Reviews</h3>
            {product.reviews?.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
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
            ) : (
              <p className="text-center text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      <SharePanel 
        isOpen={showSharePanel}
        onClose={() => setShowSharePanel(false)}
        item={product}
      />
    </div>
  );
};

export default SellerProductDetails;
```