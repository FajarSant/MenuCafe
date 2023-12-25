// components/Login.js
'use client'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterForm from './RegisterForm';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '', showPassword: false });
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Simpan token ke Local Storage
        console.log('Login successful');
        window.location.href = '/';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleTogglePassword = () => {
    setLoginData({ ...loginData, showPassword: !loginData.showPassword });
  };

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {showRegisterForm ? (
        <RegisterForm onBackToLogin={() => setShowRegisterForm(false)} onRegisterSuccess={() => setShowRegisterForm(false)} />
      ) : (
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={loginData.showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {loginData.showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <p className="text-sm">
            Belum memiliki akun?{' '}
            <span onClick={handleToggleForm} className="cursor-pointer text-blue-500 hover:underline">
              Register
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
