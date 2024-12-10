import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendationsCarousel = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      image: 'https://as2.ftcdn.net/v2/jpg/00/72/69/44/1000_F_72694495_Bcn6oO6RZvjS9VH1MwQ5PYJ8JkxkTY5E.jpg',
      price: '₹8,999',
      seller: {
        name: 'SariQueen',
        avatar: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg'
      }
    },
    {
      id: 2,
      image: 'https://as1.ftcdn.net/v2/jpg/02/06/23/78/1000_F_206237851_CoaeJYFVdhYryXWpRUr9oSHDPkqwOlDe.jpg',
      price: '₹11,999',
      seller: {
        name: 'ElegantDrapes',
        avatar: 'https://as2.ftcdn.net/v2/jpg/00/87/92/39/1000_F_87923962_bQQWAD3VILBUxwrJrGHQBZX0qQGh4rgJ.jpg'
      }
    },
    {
      id: 3,
      image: 'https://as2.ftcdn.net/v2/jpg/00/80/62/37/1000_F_80623732_8h6R0zvZVWTYHBBKqRHpqXmV0zFNrOJF.jpg',
      price: '₹13,999',
      seller: {
        name: 'SilkStudio',
        avatar: 'https://as1.ftcdn.net/v2/jpg/00/94/55/07/1000_F_94550772_qTGveZwFeacXmvLkDkXz7R3qD1C8vwDi.jpg'
      }
    }
  ];

  const handleClick = (sellerId) => {
    // Navigate to seller's profile
    navigate(`/profile/${sellerId}`);
  };

  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex space-x-4">
        {recommendations.map((item) => (
          <div 
            key={item.id}
            className="flex-shrink-0 w-40 cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={`Recommendation ${item.id}`}
                className="w-40 h-48 object-cover rounded-lg"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/50 rounded-lg p-2">
                <p className="text-white font-semibold">{item.price}</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <img 
                src={item.seller.avatar} 
                alt={item.seller.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="ml-2 text-sm text-gray-600 truncate">
                {item.seller.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCarousel;