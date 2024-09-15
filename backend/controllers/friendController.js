const User = require('../models/User');

// Send a friend request
const sendFriendRequest = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(userId);

    if (!friend) return res.status(404).json({ msg: 'User not found' });
    if (user.friends.includes(friend._id)) return res.status(400).json({ msg: 'Already friends' });

    friend.friendRequests.push(user._id);
    await friend.save();
    res.json({ msg: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend || !user.friendRequests.includes(friend._id)) {
      return res.status(400).json({ msg: 'Friend request not found' });
    }

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    user.friendRequests = user.friendRequests.filter(req => req.toString() !== friendId);
    await user.save();
    await friend.save();

    res.json({ msg: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Friend recommendation system
const recommendFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    let recommendations = [];

    for (let friend of user.friends) {
      const friendsOfFriend = await User.findById(friend._id).populate('friends');
      for (let f of friendsOfFriend.friends) {
        if (!user.friends.includes(f._id) && !recommendations.includes(f)) {
          recommendations.push(f);
        }
      }
    }

    user.recommendations = recommendations;
    await user.save();
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friendRequests');
    res.json(user.friendRequests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get friends for the logged-in user
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { sendFriendRequest, acceptFriendRequest, recommendFriends, getFriendRequests ,getFriends };
