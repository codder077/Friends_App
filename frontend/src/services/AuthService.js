import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Register new user
const register = (name, email, password) => {
  return axios.post(`${API_URL}/users/register`, { name, email, password });
};

// Login user
const login = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get the current logged-in user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
