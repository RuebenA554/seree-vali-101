import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const accounts = {
      'jothi@sareevali.com': {
        password: 'jothi123',
        redirectTo: '/'
      },
      'usha@sareevali.com': {
        password: 'usha123',
        redirectTo: '/'
      },
      'pushpa@sareevali.com': {
        password: 'pushpa123',
        redirectTo: '/'
      }
    };

    const account = accounts[credentials.email];
    if (account && credentials.password === account.password) {
      login(credentials.email);
      navigate(account.redirectTo);
    } else {
      alert('Please use the demo account credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center p-4">
      <div className="relative max-w-[390px] w-full h-[844px] bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-800">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-black rounded-b-3xl z-50"></div>
        
        <div className="h-full flex flex-col items-center justify-center px-8">
          <h1 className="font-dancing-script text-5xl text-purple-600 mb-12">
            Saree Vali
          </h1>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Demo Accounts:</p>
            <div className="space-y-2 text-gray-500">
              <p>Jothi (Seller):<br/>Email: jothi@sareevali.com<br/>Password: jothi123</p>
              <p>Usha (Buyer):<br/>Email: usha@sareevali.com<br/>Password: usha123</p>
              <p>Pushpa (Buyer):<br/>Email: pushpa@sareevali.com<br/>Password: pushpa123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;