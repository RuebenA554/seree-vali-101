import React, { useState } from 'react';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';

const Upload = () => {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const { currentUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postDetails, setPostDetails] = useState({
    price: '',
    originalPrice: '',
    hasOffer: false,
    condition: 'new',
    description: '',
    itemType: 'saree',
    dressType: '',
    category: 'North India',
    sizes: []
  });

  const sariTypes = [
    'Banarasi Silk',
    'Kanjeevaram',
    'Cotton',
    'Chiffon',
    'Georgette',
    'Designer',
    'Traditional',
    'Party Wear'
  ];

  const dressTypes = {
    'North India': [
      'Lehenga Choli',
      'Salwar Kameez',
      'Anarkali Suit',
      'Patiyala Suit',
      'Sharara Suit'
    ],
    'Western': [
      // Casual Dresses
      'T-shirt Dress',
      'Shift Dress',
      'Wrap Dress',
      'Maxi Dress',
      'Sundress',
      'Denim Dress',
      // Formal Dresses
      'A-Line Dress',
      'Sheath Dress',
      'Ball Gown',
      'Mermaid Dress',
      'Cocktail Dress',
      'Blazer Dress',
      // Party/Evening Dresses
      'Bodycon Dress',
      'Sequin Dress',
      'Slip Dress',
      'Mini Dress',
      'Off-Shoulder Dress',
      // Workwear Dresses
      'Pencil Dress',
      'Shirt Dress',
      'Midi Dress',
      // Seasonal Dresses
      'Sweater Dress',
      'Cape Dress',
      'Layered Dress',
      // Modern/Trendy Dresses
      'Cut-Out Dress',
      'Asymmetrical Dress',
      'High-Low Dress',
      'Tiered Dress',
      'Halter Neck Dress'
    ],
    'Indo-Western': [
      'Fusion Gown',
      'Dhoti Style Dress',
      'Cape Style Dress',
      'Palazzo Suit',
      'Crop Top Lehenga',
      'Draped Dress',
      'Jacket Style Dress',
      'Tulip Pants with Kurta',
      'Ruffle Saree',
      'Contemporary Anarkali',
      'Boho Dress',
      'Peasant Dress'
    ],
    'South India': [
      'Pavadai Sattai',
      'Half Saree',
      'Kanjeevaram Saree'
    ],
    'East India': [
      'Mekhela Chador',
      'Traditional Manipuri Dress'
    ]
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeToggle = (size) => {
    setPostDetails(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleSubmit = () => {
    if (!selectedImage || !postDetails.price || !postDetails.dressType) return;

    const newPost = {
      image: selectedImage,
      price: parseInt(postDetails.price),
      originalPrice: postDetails.hasOffer ? parseInt(postDetails.originalPrice) : null,
      title: postDetails.dressType.toUpperCase(),
      description: postDetails.description,
      condition: postDetails.condition,
      itemType: postDetails.itemType,
      dressType: postDetails.dressType,
      category: postDetails.category,
      sizes: postDetails.sizes,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar
      }
    };

    addPost(newPost);
    navigate('/profile');
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}>
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">New Post</h1>
            <button 
              onClick={handleSubmit}
              disabled={!selectedImage || !postDetails.price || !postDetails.dressType}
              className={`text-purple-600 font-semibold ${
                (!selectedImage || !postDetails.price || !postDetails.dressType) 
                  ? 'opacity-50 pointer-events-none' 
                  : ''
              }`}
            >
              Share
            </button>
          </div>
        </div>

        {/* Step 1: Image Selection */}
        {step === 1 && (
          <div className="p-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <PhotoIcon className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600">Tap to select a photo</p>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Post Details */}
        {step === 2 && (
          <div className="p-4 space-y-6">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-full aspect-square object-cover rounded-lg"
              />
            )}

            <div className="space-y-4">
              {/* Item Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPostDetails({
                      ...postDetails,
                      itemType: 'saree',
                      dressType: '',
                      sizes: []
                    })}
                    className={`p-3 rounded-lg text-center font-medium ${
                      postDetails.itemType === 'saree'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Saree
                  </button>
                  <button
                    onClick={() => setPostDetails({
                      ...postDetails,
                      itemType: 'dress',
                      dressType: '',
                      sizes: []
                    })}
                    className={`p-3 rounded-lg text-center font-medium ${
                      postDetails.itemType === 'dress'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dress
                  </button>
                </div>
              </div>

              {/* Price and Offer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Details
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Regular Price (₹)</label>
                    <input
                      type="number"
                      value={postDetails.hasOffer ? postDetails.originalPrice : postDetails.price}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (postDetails.hasOffer) {
                          setPostDetails({...postDetails, originalPrice: value});
                        } else {
                          setPostDetails({...postDetails, price: value});
                        }
                      }}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter price"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasOffer"
                      checked={postDetails.hasOffer}
                      onChange={(e) => setPostDetails({...postDetails, hasOffer: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="hasOffer" className="text-sm text-gray-600">
                      Add Special Offer
                    </label>
                  </div>

                  {postDetails.hasOffer && (
                    <div>
                      <label className="text-sm text-gray-600">Offer Price (₹)</label>
                      <input
                        type="number"
                        value={postDetails.price}
                        onChange={(e) => setPostDetails({...postDetails, price: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter offer price"
                      />
                    </div>
                  )}
                </div>
              </div>

              {postDetails.itemType === 'dress' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <select
                    value={postDetails.category}
                    onChange={(e) => setPostDetails({
                      ...postDetails,
                      category: e.target.value,
                      dressType: ''
                    })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {Object.keys(dressTypes).map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {postDetails.itemType === 'saree' ? 'Saree Type' : 'Dress Type'}
                </label>
                <select
                  value={postDetails.dressType}
                  onChange={(e) => setPostDetails({...postDetails, dressType: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select type</option>
                  {postDetails.itemType === 'saree' 
                    ? sariTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))
                    : dressTypes[postDetails.category]?.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))
                  }
                </select>
              </div>

              {postDetails.itemType === 'dress' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          postDetails.sizes.includes(size)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {postDetails.sizes.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Selected sizes: {postDetails.sizes.join(', ')}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPostDetails({...postDetails, condition: 'new'})}
                    className={`p-3 rounded-lg text-center font-medium ${
                      postDetails.condition === 'new'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => setPostDetails({...postDetails, condition: 'used'})}
                    className={`p-3 rounded-lg text-center font-medium ${
                      postDetails.condition === 'used'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Used
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={postDetails.description}
                  onChange={(e) => setPostDetails({...postDetails, description: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                  placeholder="Write a description..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Upload;