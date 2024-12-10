import React from 'react';
import { HeartIcon, EyeIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import AppLayout from './layout/AppLayout';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Profile View',
      message: 'Priya from Delhi viewed your profile',
      time: 'Just now',
      type: 'view',
      icon: EyeIcon
    },
    {
      id: 2,
      title: 'Payment Successful',
      message: 'Payment of ₹12,999 received for Banarasi Silk Saree',
      time: '2m ago',
      type: 'payment',
      icon: CreditCardIcon
    },
    {
      id: 3,
      title: 'New Like',
      message: 'Meera liked your Kanjeevaram Silk Saree',
      time: '5m ago',
      type: 'like',
      icon: HeartIcon
    },
    {
      id: 4,
      title: 'Order Shipped',
      message: 'Your order #1234 has been shipped',
      time: '1h ago',
      type: 'order',
      icon: CreditCardIcon
    },
    {
      id: 5,
      title: 'New Profile View',
      message: 'Anjali from Mumbai viewed your profile',
      time: '2h ago',
      type: 'view',
      icon: EyeIcon
    },
    {
      id: 6,
      title: 'New Like',
      message: 'Riya liked your Wedding Collection Saree',
      time: '3h ago',
      type: 'like',
      icon: HeartIcon
    }
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'view':
        return 'bg-blue-100 text-blue-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'like':
        return 'bg-pink-100 text-pink-800';
      case 'order':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <div className="sticky top-0 bg-white border-b">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
        </div>
        
        <div className="divide-y overflow-y-auto pb-20">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${getNotificationStyle(notification.type)} mr-4`}>
                  <notification.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;