import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  WhatsappIcon,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon
} from './icons/SocialIcons';

const ShareModal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const title = `Check out this ${item.title} for ₹${item.price} on Saree Vali!`;

  const handleShare = (platform) => {
    switch (platform) {
      case 'whatsapp':
        window.open(`whatsapp://send?text=${encodeURIComponent(title + '\n' + shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'instagram':
        // Since Instagram doesn't have a direct share URL, we'll copy to clipboard
        navigator.clipboard.writeText(title + '\n' + shareUrl);
        alert('Link copied! You can now share it on Instagram');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`);
        break;
      case 'my-ads':
        // Handle sharing to My Ads
        console.log('Shared to My Ads');
        break;
      case 'messages':
        // Handle sharing via Messages
        console.log('Shared via Messages');
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Share</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { name: 'WhatsApp', icon: WhatsappIcon, platform: 'whatsapp' },
              { name: 'Facebook', icon: FacebookIcon, platform: 'facebook' },
              { name: 'Instagram', icon: InstagramIcon, platform: 'instagram' },
              { name: 'Telegram', icon: TelegramIcon, platform: 'telegram' }
            ].map((social) => (
              <button 
                key={social.name}
                onClick={() => handleShare(social.platform)}
                className="flex flex-col items-center"
              >
                <social.icon className="w-12 h-12" />
                <span className="text-xs mt-1">{social.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleShare('my-ads')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold mb-3"
          >
            Share to My Ads
          </button>

          <button
            onClick={() => handleShare('messages')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
          >
            Share via Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;