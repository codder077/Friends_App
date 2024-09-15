const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: newUser._id, name, email } });
  } catch (err) {
    console.error("Error during registration:", err); // Log the actual error
    res.status(500).json({ msg: 'Server error', error: err.message }); // Return error message
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // User not found
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // Password does not match
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Respond with token and user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err); // Log the actual error
    res.status(500).json({ msg: 'Server error', error: err.message }); // Return error message
  }
};

// Search users
const searchUsers = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, searchUsers };
