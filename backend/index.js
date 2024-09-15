const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();

// Import routes
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Middleware
app.use(express.json());
app.use(cors()); // Handle cross-origin requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
