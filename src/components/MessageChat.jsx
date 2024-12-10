import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AppLayout from './layout/AppLayout';

const MessageChat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, I'm interested in your Banarasi silk saree",
      time: "2:30 PM",
      isSent: true
    },
    {
      id: 2,
      text: "Hello! Thank you for your interest. The saree is available.",
      time: "2:31 PM",
      isSent: false
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }),
        isSent: true
      };

      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center p-4">
            <button onClick={() => navigate('/messages')} className="mr-4">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <img 
                src="https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="font-semibold">Jothi</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto pb-20">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-3 max-w-[80%] ${
                  msg.isSent ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-white border-t p-2">
          <div className="flex items-center space-x-2">
            <button className="p-2">
              <PhotoIcon className="w-6 h-6 text-gray-500" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none"
            />

            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className={`p-2 ${message.trim() ? 'text-purple-600' : 'text-gray-400'}`}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MessageChat;