import React from 'react';
import SearchUsers from '../components/friends/SearchUsers';
import FriendList from '../components/friends/FriendList';
import FriendRequests from '../components/friends/FriendRequests';
import FriendRecommendations from '../components/friends/FriendRecommendations';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SearchUsers />
        <FriendList />
        <FriendRequests />
        <FriendRecommendations />
      </div>
    </div>
  );
};

export default Dashboard;
