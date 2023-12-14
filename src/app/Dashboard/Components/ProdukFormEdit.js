import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProdukForm = ({ onSubmit, onCancel, initialData }) => {
  const [produk, setProduk] = useState({
    nama: '',
    deskripsi: '',
    image_url: '',
    harga: 0,
    kategori: 'makanan',
  });

  useEffect(() => {
    if (initialData) {
      setProduk({
        nama: initialData.nama || '',
        deskripsi: initialData.deskripsi || '',
        image_url: initialData.image_url || '',
        harga: initialData.harga || 0,
        kategori: initialData.kategori || 'makanan',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduk((prevProduk) => ({
      ...prevProduk,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!produk.nama.trim()) {
        console.error("Nama cannot be empty");
        return;
      }

      const userConfirmed = window.confirm('Apakah Anda yakin ingin menyimpan perubahan?');

      if (!userConfirmed) {
        return;
      }

      if (initialData) {
        await axios.put(`http://localhost:5000/api/produk/${initialData.id}`, produk);
        alert('Data berhasil diperbarui!');
      } else {
        await axios.post('http://localhost:5000/api/produk', produk);
        alert('Data berhasil ditambahkan!');
      }

      onSubmit();
      onCancel();
    } catch (error) {
      console.error('Error submitting produk:', error);
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
              value={produk.nama}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="col-span-2 mb-4">
            <label className="block mb-2">Deskripsi:</label>
            <textarea
              name="deskripsi"
              value={produk.deskripsi}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">URL Gambar:</label>
            <input
              type="text"
              name="image_url" // Change here
              value={produk.image_url} // Change here
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Harga:</label>
            <input
              type="number"
              name="harga"
              value={produk.harga}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Kategori:</label>
            <select
              name="kategori"
              value={produk.kategori}
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
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdukForm;
