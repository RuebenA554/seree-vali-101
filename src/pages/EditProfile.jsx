import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    bio: currentUser?.type === 'seller' 
      ? 'Premium saree collection | Designer & Traditional wear | Best quality silk sarees'
      : 'Passionate about traditional sarees | Saree enthusiast',
    links: ''
  });

  const handleSave = () => {
    // Navigate back to the correct profile based on current user
    if (currentUser?.type === 'seller') {
      navigate('/profile/jothi_saree_vali');
    } else {
      navigate('/profile/usha_saree_lover');
    }
  };

  const handleBack = () => {
    // Navigate back to the correct profile based on current user
    if (currentUser?.type === 'seller') {
      navigate('/profile/jothi_saree_vali');
    } else {
      navigate('/profile/usha_saree_lover');
    }
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={handleBack} className="mr-4">
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Edit Profile</h1>
            </div>
            <button
              onClick={handleSave}
              className="text-purple-600 font-semibold"
            >
              Save
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                rows="4"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Links
              </label>
              <input
                type="text"
                value={profileData.links}
                onChange={(e) =>
                  setProfileData({ ...profileData, links: e.target.value })
                }
                placeholder="Add your social media links"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditProfile;