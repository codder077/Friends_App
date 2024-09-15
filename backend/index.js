const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
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

// Middleware
app.use(express.json());
app.use(cors()); // Handle cross-origin requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
