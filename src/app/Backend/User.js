const express = require('express');
const router = express.Router();
const pool = require('./DB');
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage: storage });

// Register a new user with an image
router.post('/api/register', upload.single('profileImage'), async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const [existingUsers] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUsers.length > 0) {
      console.log('User with this username already exists:', username);
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the path or URL of the uploaded image
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Insert new user with profile image
    await pool.execute('INSERT INTO users (username, password, profile_image) VALUES (?, ?, ?)', [username, hashedPassword, profileImage]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Login
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
