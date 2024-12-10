import React from 'react';
import AppLayout from '../components/layout/AppLayout';

const Explore = () => {
  const categories = [
    { id: 1, name: 'Silk', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
    { id: 2, name: 'Cotton', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
    { id: 3, name: 'Wedding', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
    { id: 4, name: 'Casual', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' }
  ];

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Explore</h1>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category.id} className="relative aspect-square rounded-lg overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;