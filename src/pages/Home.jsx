import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import SearchBar from '../components/SearchBar';
import Stories from '../components/Stories';
import AppPreview from '../components/AppPreview';
import Advertisement from '../components/Advertisement';

const Home = () => {
  return (
    <AppLayout>
      <div className="bg-white min-h-full">
        <SearchBar />
        <Stories />
        <div className="py-2">
          <Advertisement />
        </div>
        <AppPreview />
      </div>
    </AppLayout>
  );
};

export default Home;