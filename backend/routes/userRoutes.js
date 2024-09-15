const express = require('express');
const { registerUser, loginUser, searchUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchUsers);

module.exports = router;
