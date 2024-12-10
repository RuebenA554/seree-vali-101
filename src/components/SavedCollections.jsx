import React, { useState } from 'react';
import { useCollections } from '../context/CollectionContext';
import SavedItemsGrid from './SavedItemsGrid';

const SavedCollections = () => {
  const { collections } = useCollections();
  const [activeCollection, setActiveCollection] = useState(collections[0]?.id);

  const currentCollection = collections.find(c => c.id === activeCollection);

  return (
    <div>
      <div className="px-4 py-2 border-b overflow-x-auto hide-scrollbar">
        <div className="flex space-x-4">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                activeCollection === collection.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {collection.name} ({collection.items.length})
            </button>
          ))}
        </div>
      </div>

      {currentCollection && currentCollection.items.length > 0 ? (
        <SavedItemsGrid collection={currentCollection} />
      ) : (
        <div className="p-8 text-center text-gray-500">
          No items saved in this collection
        </div>
      )}
    </div>
  );
};

export default SavedCollections;