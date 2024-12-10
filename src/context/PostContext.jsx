import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    // Sarees
    {
      id: 1,
      type: 'image',
      image: 'https://i.imgur.com/2P3RH1F.jpg',
      price: 15990,
      originalPrice: 18990,
      title: 'BANARASI SILK SAREE',
      itemType: 'saree',
      dressType: 'Banarasi Silk',
      location: 'Varanasi, UP',
      likes: 178,
      reviews: [
        { 
          id: 1,
          rating: 5, 
          text: 'Gorgeous Banarasi silk! The quality is exceptional.',
          replies: []
        }
      ],
      description: 'Traditional Banarasi silk saree with rich zari work',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'Jothi',
        username: 'jothi_saree_vali',
        avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
      }
    },
    {
      id: 2,
      type: 'image',
      image: 'https://i.imgur.com/L3CuX2K.jpg',
      price: 18990,
      originalPrice: 22990,
      title: 'KANJEEVARAM SILK SAREE',
      itemType: 'saree',
      dressType: 'Kanjeevaram',
      location: 'Kanchipuram, TN',
      likes: 245,
      reviews: [
        { 
          id: 1,
          rating: 5, 
          text: 'Perfect wedding saree! The silk quality is amazing.',
          replies: []
        }
      ],
      description: 'Pure Kanjeevaram silk saree with traditional temple border',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'Pushpa',
        username: 'pushpa_sarees',
        avatar: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg'
      }
    },
    {
      id: 3,
      type: 'image',
      image: 'https://i.imgur.com/nV4F8zq.jpg',
      price: 13990,
      originalPrice: 16990,
      title: 'DESIGNER GEORGETTE SAREE',
      itemType: 'saree',
      dressType: 'Designer',
      location: 'Mumbai, MH',
      likes: 167,
      reviews: [
        { 
          id: 1,
          rating: 4, 
          text: 'Lovely design and perfect for parties!',
          replies: []
        }
      ],
      description: 'Contemporary designer georgette saree with modern prints',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'SariQueen',
        username: 'sariqueen',
        avatar: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg'
      }
    },

    // Dresses
    {
      id: 4,
      type: 'image',
      image: 'https://i.imgur.com/8tqWoXc.jpg',
      price: 10995,
      originalPrice: 12999,
      title: 'GREEN LEHENGA',
      itemType: 'dress',
      category: 'North India',
      dressType: 'Lehenga Choli',
      sizes: ['XL', 'L'],
      location: 'Jaipur, RJ',
      likes: 234,
      reviews: [
        { 
          id: 1,
          rating: 5, 
          text: 'Beautiful lehenga! The quality is amazing.',
          replies: []
        }
      ],
      description: 'Beautiful green lehenga with intricate embroidery work',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'Jothi',
        username: 'jothi_saree_vali',
        avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
      }
    },
    {
      id: 5,
      type: 'image',
      image: 'https://i.imgur.com/QYbCXVy.jpg',
      price: 11995,
      originalPrice: 14995,
      title: 'ORANGE PRINTED LEHENGA',
      itemType: 'dress',
      category: 'North India',
      dressType: 'Lehenga Choli',
      sizes: ['XL', 'L', 'M'],
      location: 'Delhi',
      likes: 189,
      reviews: [
        { 
          id: 1,
          rating: 5, 
          text: 'Stunning piece! Perfect for special occasions.',
          replies: []
        }
      ],
      description: 'Designer orange printed lehenga with modern design',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'Pushpa',
        username: 'pushpa_sarees',
        avatar: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg'
      }
    },
    {
      id: 6,
      type: 'image',
      image: 'https://i.imgur.com/yPxV1vX.jpg',
      price: 9990,
      originalPrice: 12990,
      title: 'VIOLET LEHENGA',
      itemType: 'dress',
      category: 'Western',
      dressType: 'Cocktail Dress',
      sizes: ['S', 'M', 'L'],
      location: 'Mumbai, MH',
      likes: 156,
      reviews: [
        {
          id: 1,
          rating: 4,
          text: 'Perfect fit and beautiful design!',
          replies: []
        }
      ],
      description: 'Modern fusion cocktail dress with traditional elements',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'SariQueen',
        username: 'sariqueen',
        avatar: 'https://as2.ftcdn.net/v2/jpg/05/45/89/21/1000_F_545892197_c5WYlHBwc9n0MGgqxnG9Bq6L9ZQGbNg2.jpg'
      }
    },
    {
      id: 7,
      type: 'image',
      image: 'https://i.imgur.com/JQZThqF.jpg',
      price: 8990,
      originalPrice: 11990,
      title: 'YELLOW CROP TOP LEHENGA',
      itemType: 'dress',
      category: 'Indo-Western',
      dressType: 'Crop Top Lehenga',
      sizes: ['XS', 'S', 'M', 'L'],
      location: 'Bangalore, KA',
      likes: 145,
      reviews: [
        {
          id: 1,
          rating: 5,
          text: 'Love the Indo-western fusion style!',
          replies: []
        }
      ],
      description: 'Contemporary crop top lehenga with modern silhouette',
      isLiked: false,
      isSaved: false,
      user: {
        name: 'Jothi',
        username: 'jothi_saree_vali',
        avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
      }
    }
  ]);

  const toggleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const toggleSave = (post) => {
    setPosts(prevPosts =>
      prevPosts.map(p =>
        p.id === post.id ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };

  const addReviewReply = (postId, reviewId, reply) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              reviews: post.reviews.map(review =>
                review.id === reviewId
                  ? {
                      ...review,
                      replies: [...(review.replies || []), reply]
                    }
                  : review
              )
            }
          : post
      )
    );
  };

  const updateOffer = (postId, newPrice, originalPrice) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              price: parseInt(newPrice),
              originalPrice: parseInt(originalPrice)
            }
          : post
      )
    );
  };

  const addPost = (newPost) => {
    setPosts(prevPosts => [
      {
        id: prevPosts.length + 1,
        likes: 0,
        reviews: [],
        isLiked: false,
        isSaved: false,
        ...newPost
      },
      ...prevPosts
    ]);
  };

  return (
    <PostContext.Provider value={{ 
      posts,
      toggleLike,
      toggleSave,
      addReviewReply,
      addPost,
      updateOffer
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

export default PostContext;