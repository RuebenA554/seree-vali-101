import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import AppLayout from './layout/AppLayout';
import RecommendationsCarousel from './RecommendationsCarousel';
import QuantitySelector from './QuantitySelector';
import { shareContent } from '../utils/sharing';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleShare = async (item, e) => {
    e.stopPropagation(); // Prevent event bubbling
    await shareContent(item);
  };

  const handleChat = (item, e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/messages/${item.user.username}`);
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full relative">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length})</h2>
          </div>
        </div>
        
        <div className="pb-32">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="p-4 flex items-center border-b">
                  <img 
                    src={item.image} 
                    alt={item.description}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold">{item.description}</p>
                    <p className="text-purple-600 font-bold">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center mt-2 space-x-4">
                      <QuantitySelector
                        quantity={item.quantity || 1}
                        onChange={(value) => updateQuantity(item.id, value)}
                      />
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex space-x-4 mt-2">
                      <button 
                        onClick={(e) => handleShare(item, e)}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <ShareIcon className="w-4 h-4 mr-1" />
                        Share
                      </button>
                      <button 
                        onClick={(e) => handleChat(item, e)}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommendations Section */}
              <div className="mt-6 p-4 border-t">
                <h3 className="text-lg font-semibold mb-4">You might also like</h3>
                <RecommendationsCarousel />
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4" style={{ maxWidth: '390px', margin: '0 auto' }}>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Cart;