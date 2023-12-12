// components/Topbar.js
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import {FaShoppingCart, FaUser } from 'react-icons/fa';

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Bagian Start */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl font-bold">MokaCoffee Center</span>
        </Link>
      </div>
      {/* Bagian End */}
      <div className="flex items-center space-x-4">
        {/* Icon Shopcart */}
        <FaShoppingCart className="w-6 h-6 cursor-pointer" />

        {/* Icon User */}
        <div className="relative">
          <div onClick={toggleDropdown} className="cursor-pointer">
            <FaUser className="w-6 h-6" />
          </div>

          {/* Dropdown Profil */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <div className="py-1">
                {/* Tautan ke Dashboard */}
                <Link href="/Dashboard">
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Dashboard
                  </span>
                </Link>
                {/* Tautan untuk Logout */}
                <Link href="/Login">
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Logout
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
