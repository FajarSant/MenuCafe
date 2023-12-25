'use client';
import { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({ onBackToLogin, onRegisterSuccess }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    fullName: '',
    profileImage: null,
    showPassword: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', registerData.username);
      formData.append('password', registerData.password);
      formData.append('fullName', registerData.fullName);
      if (registerData.profileImage) {
        formData.append('profileImage', registerData.profileImage);
      }

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Registration successful');
        // Inform the parent component (Login) about the registration success
        onRegisterSuccess();
      } else {
        console.error('Registration failed:', await response.text());
        // Logika tambahan jika registrasi gagal
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleTogglePassword = () => {
    setRegisterData({ ...registerData, showPassword: !registerData.showPassword });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setRegisterData({ ...registerData, profileImage: file });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
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
              type={registerData.showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {registerData.showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={registerData.fullName}
            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            onChange={handleProfileImageChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
        <p className="text-sm">
          Sudah memiliki Akun?{' '}
          <a onClick={onBackToLogin} className="cursor-pointer text-blue-500 hover:underline">
            Kembali ke Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
