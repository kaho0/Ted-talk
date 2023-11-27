/* eslint-disable react/prop-types */
// BlogCard.jsx

import { useState } from 'react';
import AxiosPublic from '../../../Axios/AxiosBase';
import Changeprivacy from './Changeprivacy';
const UserblogCard = ({ post, refetch }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const deletePost = id => {
        AxiosPublic.delete(`delete/${id}`)
            .then(res => console.log(res.data))
        refetch()
    }
   
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden mb-8 ml-2">
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
              <p className="text-white px-2  py-1 w-[60px] bg-gray-700">{post.visivility}</p>

                {/* Display Upvotes and Downvotes */}
                <div className="mt-4 flex items-center space-x-4">
                    <span className="text-green-500">
                        Upvotes: {post.upvotes}
                    </span>
                    <span className="text-red-500">
                        Downvotes: {post.downvotes}
                    </span>

                </div>

                {/* Additional Buttons */}
                <div className="mt-4  space-x-4 ">
                    <button className=" text-red-500 font-semibold focus:outline-none" onClick={() => deletePost(post._id)}>
                        Delete Post
                    </button>
                    {/* <button className=" text-purple-500 font-semibold focus:outline-none">
                        Change Visibility
                    </button> */}
                </div>
                <Changeprivacy  id={post._id} option={post.visivility} refetch={refetch}></Changeprivacy>

            </div>
        </div>

    );
};

export default UserblogCard;
