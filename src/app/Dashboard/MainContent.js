// components/MainContent.js
import React from 'react';
import User from './User';
import Dashboard from './Dashboard';
import Produk from './Produk';
import Meja from './Meja';

const MainContent = ({ selectedMenu }) => {
  return (
    <div className="flex-1 p-4">

      {selectedMenu === 'Dashboard' && <Dashboard />}
      {selectedMenu === 'User' && <User />}
      {selectedMenu === 'Analisis' && <Dashboard />}
      {selectedMenu === 'Produk' && <Produk />}
      {selectedMenu === 'Meja' && <Meja />}
    </div>
  );
};

export default MainContent;
