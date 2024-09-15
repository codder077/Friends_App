import React, { useState, useEffect } from 'react';
import FriendService from '../../services/FriendService';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    FriendService.getFriends().then((response) => setFriends(response.data));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Your Friends</h3>
      <ul className="mt-4 space-y-2">
        {friends.map((friend) => (
          <li key={friend._id} className="p-2 bg-gray-100 rounded-lg">
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
