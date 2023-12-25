// userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./DB'); // Pastikan Anda mengganti ini sesuai dengan kebutuhan

const secretKey = 'ShinXyc'; // Gantilah dengan kunci rahasia yang aman

let loggedInTokens = []; // Variable untuk menyimpan token yang masih valid

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    // Check if username already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const result = await pool.query('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', [username, hashedPassword, fullName]);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    // Check if the user exists and if the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

      // Simpan token di loggedInTokens
      loggedInTokens.push(token);

      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // Dapatkan token dari header permintaan
  const token = req.headers.authorization?.split(' ')[1];

  // Hapus token dari daftar token yang masih valid
  loggedInTokens = loggedInTokens.filter((t) => t !== token);

  res.json({ message: 'Logout successful' });
});

// Get user information endpoint
router.get('/user', authenticateToken, async (req, res) => {
  const { username } = req.user;

  try {
    // Find the user by username from the database
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (user) {
      // Check if profile image exists
      const profileImageBase64 = user.profile_image ? user.profile_image.toString('base64') : null;

      res.json({ username: user.username, name: user.name, profile_image: profileImageBase64 });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get user information endpoint
router.get('/profile', authenticateToken, async (req, res) => {
  const { username } = req.user;

  try {
    // Find the user by username from the database
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (user) {
      // Check if profile image exists
      const profileImageBase64 = user.profile_image ? user.profile_image.toString('base64') : null;

      res.json({ username: user.username, name: user.name, profile_image: profileImageBase64 });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user profile endpoint
router.put('/profile/update', authenticateToken, async (req, res) => {
  const { username } = req.user;
  const { name, profile_image } = req.body;

  try {
    // Update user profile in the database
    const result = await pool.query('UPDATE users SET name = ?, profile_image = ? WHERE username = ?', [name, profile_image, username]);

    if (result.affectedRows > 0) {
      // Fetch the updated user profile
      const [updatedUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      const updatedUser = updatedUsers[0];

      // Check if profile image exists
      const updatedProfileImageBase64 = updatedUser.profile_image ? updatedUser.profile_image.toString('base64') : null;

      res.json({ message: 'Profile updated successfully', user: { username: updatedUser.username, name: updatedUser.name, profile_image: updatedProfileImageBase64 } });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
