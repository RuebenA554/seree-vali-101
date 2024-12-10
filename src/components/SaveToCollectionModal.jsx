import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCollections } from '../context/CollectionContext';

const SaveToCollectionModal = ({ post, onClose }) => {
  const { collections, addToCollection, createCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleSave = () => {
    if (selectedCollection) {
      addToCollection(selectedCollection, post);
      onClose();
    }
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName);
      setNewCollectionName('');
      setShowNewCollectionInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Save to Collection</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`w-full text-left p-3 rounded-lg mb-2 ${
                selectedCollection === collection.id
                  ? 'bg-purple-100 border border-purple-500'
                  : 'border hover:bg-gray-50'
              }`}
            >
              <p className="font-medium">{collection.name}</p>
              <p className="text-sm text-gray-500">
                {collection.items.length} items
              </p>
            </button>
          ))}

          {showNewCollectionInput ? (
            <div className="mt-4">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
                className="w-full p-2 border rounded-lg mb-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewCollectionInput(false)}
                  className="flex-1 bg-gray-100 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewCollectionInput(true)}
              className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg text-purple-600 hover:bg-purple-50"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create New Collection</span>
            </button>
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSave}
            disabled={!selectedCollection}
            className="w-full bg-purple-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToCollectionModal;