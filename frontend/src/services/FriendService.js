import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Search users by name or email
const searchUsers = (searchTerm) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.get(`${API_URL}/users/search`, {
    headers: { Authorization: `Bearer ${user.token}` },
    params: { searchTerm },
  });
};

// Send a friend request
const sendFriendRequest = (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.post(
    `${API_URL}/friends/sendRequest`,
    { userId },
    { headers: { Authorization: `Bearer ${user.token}` } }
  );
};

// Accept a friend request
const acceptFriendRequest = (friendId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.post(
    `${API_URL}/friends/acceptRequest`,
    { friendId },
    { headers: { Authorization: `Bearer ${user.token}` } }
  );
};

// Get friend recommendations
const getRecommendations = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.get(`${API_URL}/friends/recommendations`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
};

// Get friends list
const getFriends = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.get(`${API_URL}/friends`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
};

const getFriendRequests = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/friends/requests`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

export default {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getRecommendations,
  getFriends, // Added the missing function here
  getFriendRequests
};
