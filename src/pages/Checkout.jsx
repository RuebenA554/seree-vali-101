import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import AppLayout from '../components/layout/AppLayout';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const addresses = {
    from: '123 Seller Street, Mumbai, India',
    to: '456 Buyer Lane, Delhi, India'
  };

  const breakdown = {
    price: 1000,
    gst: 50,
    platformFee: 100,
    total: 1150
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <AppLayout>
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been placed</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 pb-20">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Checkout</h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <p className="text-gray-600">Banarasi Silk Saree</p>
            <p className="font-semibold">₹{breakdown.price}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Charges Breakdown</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Product Price:</span>
                <span>₹{breakdown.price}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>₹{breakdown.gst}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (10%):</span>
                <span>₹{breakdown.platformFee}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-purple-800 pt-2 border-t">
                <span>Total:</span>
                <span>₹{breakdown.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">From:</p>
                <p className="text-gray-600">{addresses.from}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">To:</p>
                <p className="text-gray-600">{addresses.to}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {['UPI', 'Google Pay', 'Card'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full p-4 rounded-lg border ${
                    paymentMethod === method
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300'
                  } transition-colors`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition"
          >
            Pay ₹{breakdown.total}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Checkout;