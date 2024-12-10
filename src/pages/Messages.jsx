import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

const Messages = () => {
  const navigate = useNavigate();
  
  const chats = [
    {
      id: 1,
      user: 'Pushpa',
      username: 'pushpa_sarees',
      avatar: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg',
      lastMessage: 'Hi Maria, I love your latest collection!',
      time: '2m ago',
      unread: true
    },
    {
      id: 2,
      user: 'Jothi',
      username: 'jothi_saree_vali',
      avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg',
      lastMessage: 'The Banarasi silk saree is beautiful',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      user: 'SariQueen',
      username: 'sariqueen',
      avatar: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg',
      lastMessage: 'Thank you for your purchase!',
      time: '2h ago',
      unread: false
    },
    {
      id: 4,
      user: 'ElegantDrapes',
      username: 'elegantdrapes',
      avatar: 'https://as2.ftcdn.net/v2/jpg/00/87/92/39/1000_F_87923962_bQQWAD3VILBUxwrJrGHQBZX0qQGh4rgJ.jpg',
      lastMessage: 'Looking forward to your new collection',
      time: '1d ago',
      unread: false
    }
  ];

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="p-4">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
        </div>
        
        <div className="divide-y">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/messages/${chat.username}`)}
            >
              <img 
                src={chat.avatar} 
                alt={chat.user} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{chat.user}</p>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread && (
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
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

export default Messages;