const express = require('express');
const { sendFriendRequest, acceptFriendRequest, recommendFriends,getFriendRequests ,getFriends} = require('../controllers/friendController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/sendRequest', protect, sendFriendRequest);
router.post('/acceptRequest', protect, acceptFriendRequest);
router.get('/recommendations', protect, recommendFriends);
router.get('/requests', protect, getFriendRequests);  // Route for friend requests
router.get('/', protect, getFriends)
module.exports = router;
