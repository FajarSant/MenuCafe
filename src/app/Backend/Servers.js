const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const produkRoutes = require('./produk');

// Use cors middleware
app.use(cors());

// Other configurations and middleware
app.use(express.json());

app.use(produkRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
