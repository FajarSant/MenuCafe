// routes/produk.js
const express = require('express');
const router = express.Router();
const pool = require('./DB'); // Pastikan path sesuai dengan struktur file Anda

// Dapatkan semua produk
router.get('/api/produk', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM produk');
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Dapatkan produk tunggal berdasarkan ID
router.get('/api/produk/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM produk WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Buat produk baru
router.post('/api/produk', async (req, res) => {
  const { nama, deskripsi, img_url, harga, kategori } = req.body;
  try {
    await pool.query(
      'INSERT INTO produk (nama, deskripsi, image_url, harga, kategori) VALUES (?, ?, ?, ?, ?)',
      [nama, deskripsi, img_url, harga, kategori]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Perbarui produk berdasarkan ID
router.put('/api/produk/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, image_url, harga, kategori } = req.body;
  try {
    await pool.query(
      'UPDATE produk SET nama = ?, deskripsi = ?, image_url = ?, harga = ?, kategori = ? WHERE id = ?',
      [nama, deskripsi, image_url, harga, kategori, id]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Hapus produk berdasarkan ID
router.delete('/api/produk/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM produk WHERE id = ?', [id]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
