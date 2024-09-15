import React, { useState, useEffect } from 'react';
import FriendService from '../../services/FriendService';

const FriendRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    FriendService.getRecommendations()
      .then((response) => setRecommendations(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Friend Recommendations</h3>
      <ul className="mt-4 space-y-2">
        {recommendations.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
          >
            <span>{user.name}</span>
            <button
              onClick={() => FriendService.sendFriendRequest(user._id)}
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

export default FriendRecommendations;
