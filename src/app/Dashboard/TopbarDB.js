// Topbar.js
'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaBell, FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

const Topbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (!response.ok || response.status === 401) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error during user data fetch:', error);
      }
    };

    fetchUserData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Bagian Start */}
      <div className="flex items-center space-x-4">
        {/* Icon Hamburger untuk Menu atau Icon Close untuk Menutup Sidebar */}
        <div className="lg:hidden" onClick={onToggleSidebar}>
          {isSidebarOpen ? (
            <IoCloseSharp className="text-2xl cursor-pointer" />
          ) : (
            <FaBars className="text-2xl cursor-pointer" />
          )}
        </div>
      </div>
      {/* Bagian Center */}
      <div className="flex items-center ml-4 lg:ml-0">
        <div className="text-xl font-bold">MokaCoffee Center</div>
        {userData && (
          <div className="ml-4 text-sm">
            {`Hello, ${userData.name || 'User'}`} {/* Menampilkan nama pengguna jika tersedia */}
            <br />
            {currentTime.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            {' WIB'}
          </div>
        )}
      </div>
      {/* Bagian End */}
      <div className="flex items-center space-x-4">
        {/* Icon Notifikasi */}
        <div className="relative">
          <FaBell className="w-6 h-6 cursor-pointer" />
        </div>
        {/* Icon User */}
        <FaUser className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Topbar;
