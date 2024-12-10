import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { useCollections } from '../context/CollectionContext';

const SavedItemsGrid = ({ collection }) => {
  const navigate = useNavigate();
  const { removeFromCollection } = useCollections();

  const handleItemClick = (item) => {
    navigate(`/profile/${item.user.username}`, {
      state: { selectedPostId: item.id }
    });
  };

  const handleUnsave = (e, collectionId, itemId) => {
    e.stopPropagation();
    removeFromCollection(collectionId, itemId);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {collection.items.map((item) => {
        // Create a unique key by combining collection id and item id
        const uniqueKey = `${collection.id}-${item.id}`;
        
        return (
          <div
            key={uniqueKey}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-square object-cover"
            />
            
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{item.title}</h3>
              
              {item.itemType === 'dress' && item.sizes && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.sizes.map(size => (
                    <span 
                      key={`${uniqueKey}-${size}`}
                      className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}

              {item.itemType && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    {item.itemType === 'dress' ? `${item.category} - ${item.dressType}` : item.dressType}
                  </span>
                </div>
              )}

              <div className="mt-2 item-card">
                <span className="price text-lg font-bold">₹{item.price.toLocaleString()}</span>
                <button
                  onClick={(e) => handleUnsave(e, collection.id, item.id)}
                  className="add-to-cart"
                >
                  Unsave
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedItemsGrid;