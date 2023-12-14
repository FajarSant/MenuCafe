import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProdukAddForm = ({ onSubmit, onCancel }) => {
  const [newProduk, setNewProduk] = useState({
    nama: '',
    deskripsi: '',
    image_url: '',
    harga: 0,
    kategori: 'makanan',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduk((prevProduk) => ({
      ...prevProduk,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data before submitting
      if (!newProduk.nama.trim() || newProduk.harga <= 0) {
        console.error('Nama or Harga is invalid');
        return;
      }

      const userConfirmed = window.confirm('Apakah Anda yakin ingin menambahkan produk ini?');

      if (!userConfirmed) {
        return;
      }

      // Send a request to add a new product
      await axios.post('http://localhost:5000/api/produk', newProduk);

      // Trigger the parent component's onSubmit callback
      onSubmit();

      // Notify the user after triggering onSubmit
      toast.success('Produk berhasil ditambahkan', { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      console.error('Error adding new produk:', error);
      // Notify the user about the error
      toast.error('Gagal menambahkan produk', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 mb-4">
            <label className="block mb-2">Nama Produk:</label>
            <input
              type="text"
              name="nama"
              value={newProduk.nama}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="col-span-2 mb-4">
            <label className="block mb-2">Deskripsi:</label>
            <textarea
              name="deskripsi"
              value={newProduk.deskripsi}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">URL Gambar:</label>
            <input
              type="text"
              name="image_url"
              value={newProduk.image_url}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Harga:</label>
            <input
              type="number"
              name="harga"
              value={newProduk.harga}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Kategori:</label>
            <select
              name="kategori"
              value={newProduk.kategori}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="snack">Snack</option>
              <option value="kopi">Kopi</option>
              <option value="paket">Paket</option>
            </select>
          </div>
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            >
              Tambah Produk
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 ml-2"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdukAddForm;
