import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const demoAccounts = [
    { 
      id: 1, 
      name: 'Maria', 
      username: 'maria_sarees',
      image: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg',
      type: 'seller'
    },
    { 
      id: 2, 
      name: 'Usha', 
      username: 'usha_saree_lover',
      image: 'https://as2.ftcdn.net/v2/jpg/02/43/85/47/1000_F_243854711_6xq9T7sGTAfO1b7gC2wgEXVIKm5g8RHq.jpg',
      type: 'buyer'
    },
    { 
      id: 3, 
      name: 'Pushpa', 
      username: 'pushpa_sarees',
      image: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg',
      type: 'buyer'
    },
    { 
      id: 4, 
      name: 'Jothi', 
      username: 'jothi_saree_vali',
      image: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg',
      type: 'seller'
    }
  ];

  const handleProfileClick = (username) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    navigate(`/profile/${username}`);
  };

  const filteredAccounts = demoAccounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSarees = [
    { id: 1, type: 'Banarasi Silk', price: '₹12,999' },
    { id: 2, type: 'Kanjeevaram', price: '₹15,999' },
    { id: 3, type: 'Cotton', price: '₹5,999' },
    { id: 4, type: 'Designer', price: '₹18,999' }
  ].filter(saree => 
    saree.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-2 border-b relative">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="search"
          placeholder="Search sarees, sellers, or styles..."
          className="w-full bg-gray-100 pl-10 pr-12 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
      </div>

      {/* Search Results */}
      {isSearchFocused && searchQuery && (
        <div className="absolute left-0 right-0 bg-white mt-2 shadow-lg rounded-lg overflow-hidden z-50 mx-4">
          {/* People Results */}
          {filteredAccounts.length > 0 && (
            <div className="border-b">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500">People</div>
              {filteredAccounts.map(account => (
                <div 
                  key={account.id} 
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => handleProfileClick(account.username)}
                >
                  <img 
                    src={account.image} 
                    alt={account.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="font-semibold">{account.name}</div>
                    <div className="text-sm text-gray-500">
                      @{account.username}
                      <span className="ml-2 text-xs text-purple-600">
                        {account.type === 'seller' ? 'Seller' : 'Buyer'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saree Types Results */}
          {filteredSarees.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500">Saree Types</div>
              {filteredSarees.map(saree => (
                <div 
                  key={saree.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                    // Handle saree type selection
                  }}
                >
                  <div className="font-medium">{saree.type}</div>
                  <div className="text-sm text-gray-500">Starting from {saree.price}</div>
                </div>
              ))}
            </div>
          )}

          {filteredAccounts.length === 0 && filteredSarees.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;