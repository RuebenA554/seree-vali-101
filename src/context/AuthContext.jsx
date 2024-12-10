import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email) => {
    const users = {
      'jothi@sareevali.com': {
        id: 1,
        name: 'Jothi',
        username: 'jothi_saree_vali',
        type: 'seller',
        avatar: 'https://as1.ftcdn.net/v2/jpg/02/17/34/98/1000_F_217349851_JMdfUKkXgjWxUGzLHkQHsFmqFkxSHXu5.jpg'
      },
      'usha@sareevali.com': {
        id: 2,
        name: 'Usha',
        username: 'usha_saree_lover',
        type: 'buyer',
        avatar: 'https://as2.ftcdn.net/v2/jpg/02/43/85/47/1000_F_243854711_6xq9T7sGTAfO1b7gC2wgEXVIKm5g8RHq.jpg'
      },
      'pushpa@sareevali.com': {
        id: 3,
        name: 'Pushpa',
        username: 'pushpa_sarees',
        type: 'buyer',
        avatar: 'https://as2.ftcdn.net/v2/jpg/02/21/58/15/1000_F_221581579_C5uJHDpgZrPQhp0i96wkQJqe1g5WbvO7.jpg'
      }
    };

    setCurrentUser(users[email]);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const upgradeToSeller = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        type: 'seller'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login, 
      logout,
      upgradeToSeller,
      isSeller: currentUser?.type === 'seller'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);