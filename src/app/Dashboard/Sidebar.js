// components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import { FaUser, FaChartBar, FaHome, FaCube, FaSignOutAlt, FaTable } from 'react-icons/fa';
import './style.css';

const Sidebar = ({ onMenuClick, activeMenu }) => {
  const menuItems = [
    { id: 'Dashboard', icon: <FaHome className="w-6 h-6 mr-2" />, label: 'Dashboard' },
    { id: 'User', icon: <FaUser className="w-6 h-6 mr-2" />, label: 'User' },
    { id: 'Analisis', icon: <FaChartBar className="w-6 h-6 mr-2" />, label: 'Analisis' },
    { id: 'Produk', icon: <FaCube className="w-6 h-6 mr-2" />, label: 'Produk ' },
    { id: 'Meja', icon: <FaTable className="w-6 h-6 mr-2" />, label: 'Meja' },
    { id: 'Logout', icon: <FaSignOutAlt className="w-6 h-6 mr-2" />, label: 'Logout' },
  ];

  const handleLogout = () => {
    // Lakukan logika logout di sini
    // Contoh: hapus token atau lakukan proses logout sesuai kebutuhan
    // Setelah itu, redirect ke halaman utama
  };

  return (
    <div className="bg-white h-full p-4 shadow-lg">
      <div className="text-2xl font-bold mb-4 text-gray-800">MokaCoffee</div>
      {menuItems.map((menuItem) => (
        <div className="mb-4" key={menuItem.id}>
          {menuItem.id === 'Logout' ? (
            <Link href="/">
              <span className={`flex items-center text-black p-2 rounded hover:bg-gray-100`}>
                {menuItem.icon}
                {menuItem.label}
              </span>
            </Link>
          ) : (
            <button
              className={`flex items-center text-black p-2 rounded hover:bg-gray-100 ${
                activeMenu === menuItem.id ? 'bg-blue-500 text-white active' : ''
              }`}
              onClick={() => onMenuClick(menuItem.id)}
            >
              {menuItem.icon}
              {menuItem.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
