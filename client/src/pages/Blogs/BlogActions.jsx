/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import AxiosPublic from '../../Axios/AxiosBase';

function BlogActions({ post, refetch }) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const dislikedPosts = JSON.parse(localStorage.getItem('dislikedPosts')) || [];

        if (likedPosts.includes(post._id)) {
            setUpvoted(true);
        }

        if (dislikedPosts.includes(post._id)) {
            setDownvoted(true);
        }
    }, [post._id]);

    const updateVotesInDatabase = async (id) => {
        const payload = {
            upvoted: upvoted,
            downvoted: downvoted,
        }

        const res = await AxiosPublic.put(`updatevotes/${id}`, payload);

        console.log(res.data);

        if (res.data.acknowledged) {
            await refetch();

        }};

        const toggleUpvote = (id) => {
            if (upvoted) {
                setUpvoted(false);
                removePostFromLocalStorage(id, 'likedPosts');
            } else {
                setUpvoted(true);
                addPostToLocalStorage(id, 'likedPosts');
            }

            if (downvoted) {
                setDownvoted(false);
                removePostFromLocalStorage(id, 'dislikedPosts');
            }
            updateVotesInDatabase(id);
        };

        const toggleDownvote = (id) => {
            if (downvoted) {
                setDownvoted(false);
                removePostFromLocalStorage(id, 'dislikedPosts');
            } else {
                setDownvoted(true);
                addPostToLocalStorage(id, 'dislikedPosts');
            }

            if (upvoted) {
                setUpvoted(false);
                removePostFromLocalStorage(id, 'likedPosts');
            }
            updateVotesInDatabase(id);
        };

        const addPostToLocalStorage = (postId, storageKey) => {
            const storedPosts = JSON.parse(localStorage.getItem(storageKey)) || [];
            if (!storedPosts.includes(postId)) {
                storedPosts.push(postId);
                localStorage.setItem(storageKey, JSON.stringify(storedPosts));
            }
        };

        const removePostFromLocalStorage = (postId, storageKey) => {
            const storedPosts = JSON.parse(localStorage.getItem(storageKey)) || [];
            const updatedPosts = storedPosts.filter(id => id !== postId);
            localStorage.setItem(storageKey, JSON.stringify(updatedPosts));
        };

        return (
            <div className="flex justify-between items-center px-8">
                <div className={`w-28 h-10 rounded-xl  p-1 flex items-center justify-center mb-1`}
                    onClick={() => toggleUpvote(post._id)}>
                    <div className='flex space-x-1'>
                        <ArrowUpwardIcon></ArrowUpwardIcon>
                        <p className={`text-black ${upvoted ? 'font-bold' : ''}`}>{upvoted ? 'Upvoted' : 'Upvote'}</p>
                    </div>
                </div>
                <div className={`w-28 h-10 rounded-xl  p-1 flex items-center justify-center mb-1`}
                    onClick={() => toggleDownvote(post._id)}>
                    <div className='flex space-x-1'>
                        <ArrowDownwardIcon></ArrowDownwardIcon>
                        <p className={`text-black ${downvoted ? 'font-bold' : ''}`}>{downvoted ? 'Downvoted' : 'Downvote'}</p>
                    </div>
                </div>
            </div>

        );
    }

    export default BlogActions;
