// components/MainContent.js
import React from 'react';
import Dashboard from './Components/Dashboard';

const MainContent = ({ selectedMenu }) => {
  return (
    <div className="flex-1 p-4">
      <div className="text-xl font-bold mb-4">Main Content</div>

      {selectedMenu === 'Dashboard' && <Dashboard />}
    </div>
  );
};

export default MainContent;
