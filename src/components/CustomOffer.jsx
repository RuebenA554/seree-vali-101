import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';

const CustomOffer = ({ product, onClose }) => {
  const { updateOffer } = usePosts();
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
    onClose();
  };

  return (
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
  );
};

export default CustomOffer;