import React, { useState } from 'react';
import FriendService from '../../services/FriendService';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    FriendService.searchUsers(searchTerm)
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  };

  const handleSendRequest = (userId) => {
    FriendService.sendFriendRequest(userId)
      .then(() => alert('Friend request sent!'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Search Users</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
          >
            <span>{user.name} ({user.email})</span>
            <button
              onClick={() => handleSendRequest(user._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
