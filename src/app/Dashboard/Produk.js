import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCoffee, FaHamburger, FaMugHot, FaCandyCane, FaCocktail } from 'react-icons/fa';
import ProdukFormEdit from './Components/ProdukFormEdit';
import ProdukFormAdd from './Components/ProdukFormAdd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Produk = () => {
  const [produkData, setProdukData] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    fetchProdukData();
  }, []);

  const fetchProdukData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/produk');
      setProdukData(response.data);
    } catch (error) {
      console.error('Error fetching produk data:', error);
    }
  };

  const handleEditClick = (produk) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
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

  const openAddForm = () => {
    setIsAddFormOpen(true);
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
  };

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
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Produk Table</h2>
      <ToastContainer position="bottom-right" />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card icon={<FaCoffee />} name="Minuman" count={5} />
        <Card icon={<FaHamburger />} name="Makanan" count={8} />
        <Card icon={<FaMugHot />} name="Kopi" count={3} />
        <Card icon={<FaCandyCane />} name="Snack" count={4} />
        <Card icon={<FaCocktail />} name="Paket" count={2} />
      </div>

      <h2 className="text-2xl font-bold mb-2">Tambahkan Menu</h2>
      <button
        onClick={openAddForm}
        type="button"
        className="px-3 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <FaPlus className="w-4 h-4 text-white me-2" />
        Add
      </button>

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
                <img
                  src={produk.image_url}
                  alt={`Gambar ${produk.nama}`}
                  className="w-16 h-16 object-cover"
                />
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

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <ProdukFormEdit
              onSubmit={() => {
                setIsModalOpen(false);
                fetchProdukData();
                toast.success('Produk berhasil diupdate', {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }}
              onCancel={() => setIsModalOpen(false)}
              initialData={selectedProduk}
            />
          </div>
        </div>
      )}

      {/* Modal for Adding */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <ProdukFormAdd
              onSubmit={() => {
                closeAddForm();
                fetchProdukData();
              }}
              onCancel={closeAddForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Produk;
