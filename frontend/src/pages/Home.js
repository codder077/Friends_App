import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Friend Connect</h1>
        <p className="text-xl mb-6">Find friends and build connections easily.</p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">Login</button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-transparent border border-white rounded-lg text-white hover:bg-white hover:text-blue-600 transition">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
