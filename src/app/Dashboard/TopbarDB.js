// TopbarDB.js
'use client'
// TopbarDB.js
import React, { useState, useEffect } from 'react';
import {FaBars, FaBell, FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

const Topbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

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
        <div className="ml-4 text-sm">
          {currentTime.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {' WIB'}
        </div>
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
