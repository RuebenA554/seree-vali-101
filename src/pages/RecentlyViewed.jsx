import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const RecentlyViewed = () => {
  const navigate = useNavigate();

  const recentItems = [
    {
      id: 1,
      title: 'Violet Bridal Lehenga',
      price: 12999,
      image: 'https://i.imgur.com/yPxV1vX.jpg',
      viewedAt: '2024-01-15T14:30:00'
    },
    {
      id: 2,
      title: 'Orange Printed Lehenga',
      price: 8990,
      image: 'https://i.imgur.com/QYbCXVy.jpg',
      viewedAt: '2024-01-15T13:45:00'
    },
    {
      id: 3,
      title: 'Banarasi Silk Saree',
      price: 15990,
      image: 'https://i.imgur.com/2P3RH1F.jpg',
      viewedAt: '2024-01-15T12:15:00'
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
            <h1 className="text-lg font-semibold">Recently Viewed</h1>
          </div>
        </div>

        <div className="p-4">
          {recentItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border rounded-lg p-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-purple-600 font-bold">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  Viewed {new Date(item.viewedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default RecentlyViewed;