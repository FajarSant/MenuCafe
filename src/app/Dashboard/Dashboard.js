import React from 'react';
import { FaCoffee, FaChair, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const Card = ({ icon, name, count }) => {
    return (
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-2xl text-gray-700 mb-2">{icon}</div>
        <div className="text-xl font-bold">{name}</div>
        <div className="text-sm text-gray-500">Jumlah: {count}</div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Produk Card */}
      <Card icon={<FaCoffee />} name="Produk" count={10} />

      {/* Meja Card */}
      <Card icon={<FaChair />} name="Meja" count={20} />

      {/* User Card */}
      <Card icon={<FaUser />} name="User" count={30} />
    </div>
  );
};

export default Dashboard;
