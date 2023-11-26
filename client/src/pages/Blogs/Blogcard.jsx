// BlogCard.jsx

import React from 'react';

const BlogCard = ({ post }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={post.author.image}
            alt={post.author.name}
          />
          <div>
            <p className="text-gray-900 font-semibold">{post.author.name}</p>
            <p className="text-gray-600">{post.time}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-500 mb-2">{post.tag}</p>
        <p className="text-gray-700">{post.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
