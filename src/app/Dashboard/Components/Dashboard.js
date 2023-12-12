// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProdukForm from './ProdukFrom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [produkData, setProdukData] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProdukData();
  }, []);

  const fetchProdukData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/produk');
      setProdukData(response.data);
    } catch (error) {
      console.error('Error fetching produk data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (produk) => {
    setSelectedProduk(produk);
    openModal();
  };

  const handleDeleteClick = async (id) => {
    try {
      const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/produk/${id}`);
      fetchProdukData();

      toast.success('Produk berhasil dihapus', { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      console.error('Error deleting produk:', error);
      toast.error('Gagal menghapus produk', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduk(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produk Table</h2>
      <ToastContainer position="bottom-right" />

      <table className="w-full border-collapse border mt-4">
  <thead className="bg-gray-200">
    <tr>
      <th className="border p-2">No</th>
      <th className="border p-2">URL Gambar</th>
      <th className="border p-2">Nama Produk</th>
      <th className="border p-2">Deskripsi</th>
      <th className="border p-2">Harga</th>
      <th className="border p-2">Kategori</th>
      <th className="border p-2">Aksi</th>
    </tr>
  </thead>
  <tbody>
  {produkData.map((produk, index) => (
    <tr key={index} className="border">
      <td className="border p-2">{index + 1}</td>
      <td className="border p-2">
        <img src={produk.image_url} alt={`Gambar ${produk.nama}`} className="w-16 h-16 object-cover" />
      </td>
      <td className="border p-2">{produk.nama}</td>
      <td className="border p-2">{produk.deskripsi}</td>
      <td className="border p-2">{produk.harga}</td>
      <td className="border p-2">{produk.kategori}</td>
      <td className="border p-2">
        <button
          onClick={() => handleEditClick(produk)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteClick(produk.id)}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>





      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <ProdukForm
              onSubmit={() => {
                closeModal();
                fetchProdukData();
                toast.success('Produk berhasil diupdate', { position: toast.POSITION.BOTTOM_RIGHT });
              }}
              onCancel={closeModal}
              initialData={selectedProduk}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
