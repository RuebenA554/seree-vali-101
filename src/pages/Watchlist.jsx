import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const Watchlist = () => {
  const navigate = useNavigate();

  const watchlist = [
    {
      id: 1,
      title: 'Kanjeevaram Silk Saree',
      price: 13990,
      originalPrice: 16990,
      image: 'https://i.imgur.com/L3CuX2K.jpg',
      seller: 'SariQueen'
    },
    {
      id: 2,
      title: 'Yellow Crop Top Lehenga',
      price: 8999,
      originalPrice: 11999,
      image: 'https://i.imgur.com/JQZThqF.jpg',
      seller: 'Jothi'
    }
  ];

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center p-4">
            <button onClick={() => navigate('/settings')} className="mr-4">
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Watchlist</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {watchlist.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">by {item.seller}</p>
                <div className="mt-2">
                  <span className="text-purple-600 font-bold">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Watchlist;