import React, { useState, useEffect } from 'react';

const Advertisement = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const ads = [
    {
      id: 1,
      image: "https://as2.ftcdn.net/v2/jpg/02/77/24/91/1000_F_277249146_PhQR2zXBD9w6sURU3nGBkLCE8VNbTjXa.jpg",
      title: "Festive Collection",
      description: "Up to 30% off on all festive wear",
      tag: "Limited Time Offer"
    },
    {
      id: 2,
      image: "https://as1.ftcdn.net/v2/jpg/02/77/24/91/1000_F_277249168_DV8MXwRcwFtWQWx7VqNK0qWZBVqQjPJL.jpg",
      title: "Wedding Season Sale",
      description: "Special prices on bridal collection",
      tag: "Bridal Special"
    },
    {
      id: 3,
      image: "https://as2.ftcdn.net/v2/jpg/02/77/24/91/1000_F_277249186_e9d3Z3VC3wJo5M1HxpyXp3YoGZx6JfKB.jpg",
      title: "Designer Collection",
      description: "Exclusive designer pieces at amazing prices",
      tag: "New Arrivals"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4">
      <div className="relative h-40 rounded-xl overflow-hidden shadow-sm">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentAd ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div className="absolute top-2 right-2">
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  {ad.tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold">{ad.title}</h3>
                <p className="text-white/90 text-sm">{ad.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentAd ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;