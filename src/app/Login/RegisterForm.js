'use client';
import React, { useState } from 'react';

const RegisterForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Registration successful' });

        // Redirect to the home page upon successful registration
        window.location.href = '/';
      } else {
        const data = await response.json();
        setNotification({ type: 'error', message: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setNotification({ type: 'error', message: 'Internal Server Error' });
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {notification && (
        <div className={`mb-4 text-${notification.type === 'success' ? 'green' : 'red'}-500`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-gray-600 text-sm font-medium">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Register
        </button>
        <p className="mt-2 text-gray-600">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => onToggleForm('login')}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
