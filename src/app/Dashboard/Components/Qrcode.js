// components/Meja.js
import React, { useState, useEffect } from 'react';
import { FaChair } from 'react-icons/fa';
import QRCode from 'qrcode.react';

const Meja = ({ tableNumber }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleScan = () => {
    if (!isBooked) {
      setIsBooked(true);
    } else {
      // Ganti URL di bawah dengan URL menu yang sesuai
      window.location.href = `https://www.Twitter.com/${tableNumber}`;
    }
  };

  const handleComplete = () => {
    // Lakukan tindakan yang sesuai, misalnya, mengirimkan data ke server bahwa pesanan selesai
    setIsCompleted(true);
    setIsBooked(false); // Setelah selesai, meja kembali menjadi kosong
  };

  // Reset kondisi saat isCompleted berubah
  useEffect(() => {
    if (isCompleted) {
      const resetTimer = setTimeout(() => {
        setIsCompleted(false);
      }, 5000); // Setelah 5 detik, reset kondisi
      return () => clearTimeout(resetTimer);
    }
  }, [isCompleted]);

  return (
    <tr key={tableNumber}>
      <td className="border p-2">
        <FaChair size={20} />
      </td>
      <td className="border p-2">{`Meja ${tableNumber}`}</td>
      <td className="border p-2">
        <span
          className={`px-2 py-1 rounded ${
            isBooked ? (isCompleted ? 'bg-blue-500 text-white' : 'bg-green-500 text-white') : 'bg-gray-300 text-gray-700'
          }`}
        >
          {isBooked ? (isCompleted ? 'Selesai' : 'Dipesan') : 'Kosong'}
        </span>
      </td>
      <td className="border p-2">
        {isBooked && !isCompleted && (
          <button
            onClick={handleComplete}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Selesai
          </button>
        )}
        <QRCode
          value={`https://example.com/reservation/${tableNumber}`}
          size={80} // Tambahkan properti size untuk menentukan ukuran QR code
          onClick={handleScan}
        />
      </td>
    </tr>
  );
};

export default Meja;
