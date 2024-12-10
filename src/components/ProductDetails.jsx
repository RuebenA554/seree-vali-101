import React, { useState } from 'react';
import { ArrowLeftIcon, StarIcon, ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import RecommendationsCarousel from './RecommendationsCarousel';
import SharePanel from './SharePanel';
import CustomOffer from './CustomOffer';

const ProductDetails = ({ product, onClose, fromProfile = false }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAddedToCart(true);
  };

  const handleChat = () => {
    navigate(`/messages/${product.user.username}`);
  };

  const handleShare = () => {
    setShowSharePanel(true);
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
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
            <button 
              className="text-sm text-purple-600 mt-1"
              onClick={() => navigate(`/profile/${product.user.username}`)}
            >
              by {product.user.name}
            </button>
          </div>

          <div className="flex items-center">
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

          <div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 text-lg line-through ml-2">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                    -{getDiscountPercentage()}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {product.itemType === 'dress' && (
            <div>
              <p className="text-gray-600">Region: {product.category}</p>
              <p className="text-gray-600">Type: {product.dressType}</p>
              {product.sizes && (
                <div className="mt-2">
                  <p className="font-medium mb-1">Available Sizes:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {product.itemType === 'saree' && (
            <div>
              <p className="text-gray-600">Type: {product.dressType}</p>
              {product.location && (
                <p className="text-gray-600">From: {product.location}</p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Quantity:</label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100"
            >
              <ShareIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleChat}
              className="p-2 rounded-lg bg-gray-100"
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
            </button>
          </div>

          {!fromProfile && (
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                addedToCart 
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
          )}

          {fromProfile && currentUser?.type === 'seller' && (
            <CustomOffer product={product} onClose={onClose} />
          )}

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
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No reviews yet</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">You might also like</h3>
            <RecommendationsCarousel />
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

export default ProductDetails;