// routes/produk.js
const express = require('express');
const router = express.Router();
const connection = require('./DB'); // Assuming your database connection is in a file named 'db.js'

// Get all products
router.get('/api/produk', (req, res) => {
  connection.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a single product by ID
router.get('/api/produk/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM produk WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Create a new product
router.post('/api/produk', (req, res) => {
  const { nama, deskripsi, img_url, harga, kategori } = req.body;
  connection.query(
    'INSERT INTO produk (nama, deskripsi, img_url, harga, kategori) VALUES (?, ?, ?, ?, ?)',
    [nama, deskripsi, img_url, harga, kategori],
    (err) => {
      if (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ success: true });
      }
    }
  );
});

// Update a product by ID
router.put('/api/produk/:id', (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi, image_url, harga, kategori } = req.body;
    connection.query(
      'UPDATE produk SET nama = ?, deskripsi = ?, image_url = ?, harga = ?, kategori = ? WHERE id = ?',
      [nama, deskripsi, image_url, harga, kategori, id],
      (err) => {
        if (err) {
          console.error('Error updating product:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ success: true });
        }
      }
    );
  });
  
// Delete a product by ID
router.delete('/api/produk/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM produk WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;
