import React, { createContext, useContext, useState } from 'react';

const CollectionContext = createContext(null);

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: 'Favorites',
      items: [
        {
          id: 1,
          image: 'https://i.imgur.com/8tqWoXc.jpg',
          title: 'GREEN LEHENGA',
          itemType: 'dress',
          category: 'North India',
          dressType: 'Lehenga Choli',
          price: 10995,
          sizes: ['XL', 'L'],
          user: {
            name: 'Jothi',
            username: 'jothi_saree_vali',
            avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
          }
        },
        {
          id: 2,
          image: 'https://i.imgur.com/2P3RH1F.jpg',
          title: 'BANARASI SILK SAREE',
          itemType: 'saree',
          dressType: 'Banarasi Silk',
          price: 15990,
          user: {
            name: 'Pushpa',
            username: 'pushpa_sarees',
            avatar: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg'
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Wedding',
      items: [
        {
          id: 3,
          image: 'https://i.imgur.com/L3CuX2K.jpg',
          title: 'KANJEEVARAM SILK SAREE',
          itemType: 'saree',
          dressType: 'Kanjeevaram',
          price: 18990,
          user: {
            name: 'SariQueen',
            username: 'sariqueen',
            avatar: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg'
          }
        },
        {
          id: 4,
          image: 'https://i.imgur.com/QYbCXVy.jpg',
          title: 'ORANGE PRINTED LEHENGA',
          itemType: 'dress',
          category: 'North India',
          dressType: 'Lehenga Choli',
          price: 11995,
          sizes: ['XL', 'L', 'M'],
          user: {
            name: 'Jothi',
            username: 'jothi_saree_vali',
            avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
          }
        }
      ]
    },
    {
      id: 3,
      name: 'Party Wear',
      items: [
        {
          id: 5,
          image: 'https://i.imgur.com/nV4F8zq.jpg',
          title: 'DESIGNER GEORGETTE SAREE',
          itemType: 'saree',
          dressType: 'Designer',
          price: 13990,
          user: {
            name: 'Usha',
            username: 'usha_saree_lover',
            avatar: 'https://as2.ftcdn.net/v2/jpg/02/43/85/47/1000_F_243854711_6xq9T7sGTAfO1b7gC2wgEXVIKm5g8RHq.jpg'
          }
        }
      ]
    },
    {
      id: 4,
      name: 'Traditional',
      items: [
        {
          id: 6,
          image: 'https://i.imgur.com/mxwBQhM.jpg',
          title: 'COTTON HANDLOOM SAREE',
          itemType: 'saree',
          dressType: 'Cotton',
          price: 8990,
          user: {
            name: 'Jothi',
            username: 'jothi_saree_vali',
            avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
          }
        }
      ]
    }
  ]);

  const addToCollection = (collectionId, item) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === collectionId
          ? { ...collection, items: [...collection.items, item] }
          : collection
      )
    );
  };

  const createCollection = (name) => {
    setCollections(prev => [
      ...prev,
      { id: Date.now(), name, items: [] }
    ]);
  };

  const removeFromCollection = (collectionId, itemId) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? { ...collection, items: collection.items.filter(item => item.id !== itemId) }
          : collection
      )
    );
  };

  return (
    <CollectionContext.Provider value={{
      collections,
      addToCollection,
      createCollection,
      removeFromCollection
    }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollections = () => useContext(CollectionContext);