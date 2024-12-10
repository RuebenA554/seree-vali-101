import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const OrderHistory = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 'OD123456',
      date: '2024-01-15',
      status: 'Delivered',
      items: [
        {
          id: 1,
          title: 'Banarasi Silk Saree',
          price: 15990,
          image: 'https://i.imgur.com/2P3RH1F.jpg'
        }
      ],
      total: 15990
    },
    {
      id: 'OD123457',
      date: '2024-01-10',
      status: 'Processing',
      items: [
        {
          id: 2,
          title: 'Green Lehenga',
          price: 10995,
          image: 'https://i.imgur.com/8tqWoXc.jpg'
        }
      ],
      total: 10995
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
            <h1 className="text-lg font-semibold">Order History</h1>
          </div>
        </div>

        <div className="p-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg mb-4">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-purple-600">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-purple-600">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderHistory;