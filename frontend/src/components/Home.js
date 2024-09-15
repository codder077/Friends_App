import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/friends/recommendations', {
        headers: { 'x-auth-token': token },
      });
      setRecommendations(data);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Friend Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12">
        {recommendations.map(user => (
          <div key={user._id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <button className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
