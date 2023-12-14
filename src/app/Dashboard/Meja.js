// pages/index.js
import React from 'react';
import Meja from './Components/Qrcode';

const Home = () => {
  const totalTables = 5; // Ganti sesuai jumlah meja yang diinginkan

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Meja</h1>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Icon</th>
            <th className="border p-2">Nama Meja</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(totalTables)].map((_, index) => (
            <Meja key={index + 1} tableNumber={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
