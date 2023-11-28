/* eslint-disable react/prop-types */
import {  useState } from 'react';


import AxiosPublic from '../../Axios/AxiosBase';

function BlogActions({post}) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const updateVotesInDatabase = (id) => {
        const payload = {
            upvotes: upvotes,
            downvotes: downvotes,
        }

        AxiosPublic.put(`updatevotes/${id}`, payload)
            .then(res => console.log(res.data))

    };

const updateUpvote=(id)=>{

handleUpvote()
updateVotesInDatabase(id)

}

const updateDownvote=(id)=>{

handleDownvote()
updateVotesInDatabase(id)

}


    const handleUpvote = () => {
        if (!upvoted) {
            setUpvotes(upvotes + 1);
            setUpvoted(true);
            if (downvoted) {
                setDownvoted(false);
                setDownvotes(downvotes - 1);
            }
        }
    }; 

    const handleDownvote = () => {
        if (!downvoted) {
            setDownvotes(downvotes + 1);
            setDownvoted(true);
            if (upvoted) {
                setUpvoted(false);
                setUpvotes(upvotes - 1);
            }
        }
    };

    return (
        <div className="flex justify-between items-center px-6">
            <div className={`w-12 h-10 rounded-xl bg-${upvoted ? 'blue' : 'green'}-400 p-1 flex items-center justify-center mb-1`}
             onClick={()=>updateUpvote(post._id)}>
                {upvotes}
            </div>
            <div className={`w-12 h-10 rounded-xl bg-${downvoted ? 'blue' : 'red'}-400 p-1 flex items-center justify-center mb-1`} 
            onClick={()=>updateDownvote(post._id)}>
                {downvotes}
            </div>
        </div>
    );
}

export default BlogActions;
