import React from 'react';

const ProductCard = ({ image, title, price, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-64 object-cover"/>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-pink-600 font-bold">₹{price}</p>
        <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;