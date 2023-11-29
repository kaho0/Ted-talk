/* eslint-disable react/prop-types */
// BlogCard.jsx

import { useState } from 'react';

import BlogActions from './BlogActions';
import AddCommentModal from './Addcommentmodal';
const BlogCard = ({ post }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden mb-8 ml-2 flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={post.image}
            alt={post.name}
          />
          <div>
            <p className="text-gray-900 font-semibold">{post.name}</p>
            <p className="text-gray-600">{post.dateTime}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-500 mb-2">{post.selectedTag}</p>
        <p className="text-gray-700">
          {showFullDescription ? post.description : `${post.description.slice(0, 150)}...`}
        </p>
        {post.description.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {showFullDescription ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
      <BlogActions post={post}></BlogActions>
      <div className='ml-[150px] mb-3'>
        <AddCommentModal id={post._id}></AddCommentModal>


      </div>

    </div>
  );
};

export default BlogCard;
