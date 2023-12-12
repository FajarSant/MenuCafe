// page.js
'use client'
// Page.js
import React, { useState } from 'react';
import Topbar from './TopbarDB';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import "./style.css"

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <Topbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className="flex h-screen">
        {isSidebarOpen && <Sidebar onClose={toggleSidebar} onMenuClick={handleMenuClick} />}
        <MainContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Page;
