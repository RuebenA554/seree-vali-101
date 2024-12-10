import React, { useState } from 'react';
import { 
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  BanknotesIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  KeyIcon,
  ShoppingBagIcon,
  PhoneIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';

const Settings = () => {
  const navigate = useNavigate();
  const { logout, currentUser, upgradeToSeller } = useAuth();
  const [showBankForm, setShowBankForm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });

  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Floor 3',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSellerUpgrade = () => {
    if (window.confirm('Upgrade to seller account for ₹29/month?')) {
      upgradeToSeller();
      alert('Congratulations! You are now a seller. You can start posting your products.');
      navigate('/upload');
    }
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: UserIcon,
          title: 'Personal Information',
          subtitle: 'Update your profile details',
          action: () => navigate('/personal-information')
        },
        {
          icon: MapPinIcon,
          title: 'Addresses',
          subtitle: 'Manage delivery addresses',
          action: () => setShowAddresses(true)
        },
        {
          icon: BuildingLibraryIcon,
          title: 'Bank Account Details',
          subtitle: 'Manage your bank information',
          action: () => setShowBankForm(true)
        }
      ]
    },
    {
      title: 'Shopping',
      items: [
        {
          icon: ShoppingBagIcon,
          title: 'Orders',
          subtitle: 'View your order history',
          action: () => navigate('/orders')
        },
        {
          icon: HeartIcon,
          title: 'Watchlist',
          subtitle: 'Items you\'re interested in',
          action: () => navigate('/watchlist')
        },
        {
          icon: EyeIcon,
          title: 'Recently Viewed',
          subtitle: 'Products you\'ve browsed',
          action: () => navigate('/recently-viewed')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: QuestionMarkCircleIcon,
          title: 'Help & FAQs',
          subtitle: 'Get help with using the app',
          action: () => setShowHelp(true)
        },
        {
          icon: ChatBubbleLeftRightIcon,
          title: 'Contact Us',
          subtitle: 'Get in touch with our support team',
          action: () => {}
        }
      ]
    }
  ];

  if (showAddresses) {
    return (
      <AppLayout>
        <div className="bg-white min-h-full">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center p-4">
              <button onClick={() => setShowAddresses(false)} className="mr-4">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Manage Addresses</h1>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg mb-4">
              + Add New Address
            </button>

            <div className="space-y-4">
              {addresses.map(address => (
                <div key={address.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{address.type}</span>
                    <button className="text-purple-600 text-sm">Edit</button>
                  </div>
                  <p className="text-gray-600">{address.address}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (showHelp) {
    return (
      <AppLayout>
        <div className="bg-white min-h-full">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center p-4">
              <button onClick={() => setShowHelp(false)} className="mr-4">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Help & FAQs</h1>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {[
              {
                icon: KeyIcon,
                title: 'Login & Password',
                content: [
                  'How to log in to your account',
                  'Reset your password',
                  'Account security tips'
                ]
              },
              {
                icon: ShoppingBagIcon,
                title: 'Buying & Selling',
                content: [
                  'How to purchase sarees',
                  'List your products',
                  'Manage your listings'
                ]
              },
              {
                icon: PhoneIcon,
                title: 'Contact Support',
                content: [
                  'Chat with support',
                  'Report an issue',
                  'Feedback and suggestions'
                ]
              }
            ].map((topic, index) => (
              <div key={index} className="bg-white rounded-lg border p-4">
                <div className="flex items-center mb-4">
                  <topic.icon className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="font-semibold">{topic.title}</h3>
                </div>
                <ul className="space-y-2">
                  {topic.content.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  if (showBankForm) {
    return (
      <AppLayout>
        <div className="bg-white min-h-full">
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center p-4">
              <button onClick={() => setShowBankForm(false)} className="mr-4">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Bank Account Details</h1>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter account holder name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={bankDetails.ifscCode}
                onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter IFSC code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter bank name"
              />
            </div>

            <button 
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold mt-6"
              onClick={() => {
                alert('Bank details saved successfully!');
                setShowBankForm(false);
              }}
            >
              Save Bank Details
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="p-4">
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>

        <div className="pb-20">
          {/* Account Type Section */}
          {currentUser?.type !== 'seller' && (
            <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Upgrade to Seller Account
                  </h2>
                  <p className="text-sm mt-1 text-white/90">
                    Start selling your products today!
                  </p>
                </div>
                <button
                  onClick={handleSellerUpgrade}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* Settings Sections */}
          {settingsSections.map((section, index) => (
            <div key={index} className="py-2">
              <h2 className="px-4 py-2 text-sm font-semibold text-gray-500">
                {section.title}
              </h2>
              <div className="divide-y">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full px-4 py-3 flex items-center hover:bg-gray-50"
                  >
                    <item.icon className="w-6 h-6 text-gray-500" />
                    <div className="ml-3 flex-1 text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div className="px-4 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-red-600 py-3 rounded-lg border border-red-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;