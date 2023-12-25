// components/CustomTopbar.js
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomTopbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ambil token dari Local Storage
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Sertakan token dalam header
        },
      });

      if (response.ok) {
        setUser(null);
        setDropdownOpen(false);
        localStorage.removeItem('token'); // Hapus token dari Local Storage saat logout
        toast.success('You have been logged out.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        console.error('Logout failed');
        toast.error('Logout failed. Please try again.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Internal Server Error. Please try again later.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">MokaCoffee Center</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <FaShoppingCart className="w-6 h-6 cursor-pointer" />
          <div className="relative" onClick={toggleDropdown}>
  {user && user.profile_image ? (
    <div className="flex items-center cursor-pointer">
      <img
        src={`data:image/jpeg;base64,${user.profile_image}`}
        alt="User Profile"
        className="w-6 h-6 rounded-full mr-2"
      />
      <div>
        Welcome, <span className="font-bold">{user.name}</span>!
      </div>
    </div>
  ) : (
    <div className="w-6 h-6 bg-gray-300 rounded-full cursor-pointer"></div>
  )}
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
      <div className="py-1">
        {user ? (
          <>
            <Link href="/Dashboard">
              <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Dashboard
              </span>
            </Link>
            <Link href="/Profile">
              <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Profile
              </span>
            </Link>
            <span
              className="block px-4 py-2 text-gray-800 hover-bg-gray-200 w-full text-left cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        ) : (
          <Link href="/Login">
            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  )}
</div>

        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default CustomTopbar;
