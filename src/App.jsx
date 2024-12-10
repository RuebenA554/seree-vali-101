import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PostProvider } from './context/PostContext';
import { CollectionProvider } from './context/CollectionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import BuyerProfile from './pages/BuyerProfile';
import EditProfile from './pages/EditProfile';
import PersonalInformation from './pages/PersonalInformation';
import OrderHistory from './pages/OrderHistory';
import Watchlist from './pages/Watchlist';
import RecentlyViewed from './pages/RecentlyViewed';
import Checkout from './pages/Checkout';
import Notifications from './components/Notifications';
import Upload from './pages/Upload';
import Cart from './components/Cart';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import MessageChat from './pages/MessageChat';

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <CartProvider>
          <CollectionProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile/:username"
                  element={
                    <ProtectedRoute>
                      <BuyerProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/personal-information"
                  element={
                    <ProtectedRoute>
                      <PersonalInformation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/watchlist"
                  element={
                    <ProtectedRoute>
                      <Watchlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recently-viewed"
                  element={
                    <ProtectedRoute>
                      <RecentlyViewed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages/:userId"
                  element={
                    <ProtectedRoute>
                      <MessageChat />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </CollectionProvider>
        </CartProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;