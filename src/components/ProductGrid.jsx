import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LikeButton from './LikeButton';
import { usePosts } from '../context/PostContext';

const ProductGrid = ({ products = [] }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const { toggleLike, toggleSave } = usePosts();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
  };

  const handleLikeClick = (postId, e) => {
    e.stopPropagation();
    toggleLike(postId);
  };

  const handleSaveClick = (post, e) => {
    e.stopPropagation();
    toggleSave(post);
  };

  const handleProductClick = (product) => {
    navigate(`/profile/${product.user.username}`, {
      state: { selectedPostId: product.id }
    });
  };

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / reviews.length);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
          onClick={() => handleProductClick(product)}
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full aspect-square object-cover"
            />
            {currentUser?.type !== 'seller' && (
              <button 
                onClick={(e) => handleSaveClick(product, e)}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow"
              >
                {product.isSaved ? (
                  <BookmarkSolid className="w-5 h-5 text-purple-600" />
                ) : (
                  <BookmarkOutline className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{product.title}</h3>
            
            {product.itemType === 'dress' && product.sizes && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.sizes.map(size => (
                  <span 
                    key={size} 
                    className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}

            {product.itemType && (
              <div className="mt-2">
                <span className="text-xs text-gray-500">
                  {product.itemType === 'dress' ? `${product.category} - ${product.dressType}` : product.dressType}
                </span>
              </div>
            )}

            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarSolid
                    key={i}
                    className={`w-4 h-4 ${
                      i < getAverageRating(product.reviews) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${product.user.username}`, {
                    state: { selectedPostId: product.id, showReviews: true }
                  });
                }}
                className="text-gray-500 text-xs ml-1"
              >
                ({product.reviews?.length || 0} reviews)
              </button>
            </div>

            <div className="mt-2 item-card">
              <div className="flex items-center justify-between">
                <span className="price">₹{product.price.toLocaleString()}</span>
                <LikeButton 
                  isLiked={product.isLiked}
                  onLike={(e) => handleLikeClick(product.id, e)}
                  showCount={false}
                />
              </div>
              
              {currentUser?.type !== 'seller' && (
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className={`add-to-cart ${addedToCart[product.id] ? 'added' : ''}`}
                  disabled={addedToCart[product.id]}
                >
                  {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;