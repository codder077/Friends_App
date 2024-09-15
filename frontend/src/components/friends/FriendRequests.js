import React, { useState, useEffect } from 'react';
import FriendService from '../../services/FriendService';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch the friend requests from the API (you need to implement this in the backend)
    FriendService.getFriendRequests()
      .then((response) => setRequests(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAcceptRequest = (friendId) => {
    FriendService.acceptFriendRequest(friendId)
      .then(() => {
        alert('Friend request accepted!');
        setRequests(requests.filter((req) => req._id !== friendId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span>{request.name}</span>
            <button
              onClick={() => handleAcceptRequest(request._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
