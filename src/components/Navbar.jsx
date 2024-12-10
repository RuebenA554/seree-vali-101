import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white z-40 border-b">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="font-dancing-script text-2xl text-purple-600 hover:text-purple-700 transition-colors">
          Saree Vali
        </Link>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative"
            onClick={() => navigate('/notifications')}
          >
            <BellIcon className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </button>
          
          <button 
            className="relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          
          <Link to="/profile">
            <img
              src={currentUser?.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-purple-600"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;