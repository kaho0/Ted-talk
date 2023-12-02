import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import BlogCard from "../Blogs/Blogcard";

const PopularPosts = () => {
    const [posts, setposts] = useState([])

    useEffect(() => {
        AxiosPublic.get('/popularposts')
            .then(res => {
                setposts(res.data)
            })


    }, [])
    return (
        <div>
   <div className="mt-10">

            <div className="text-4xl font-bold text-gray-600 mb-6 text-center">
                Popular Blog Entries
            </div>

            <div className="flex justify-between ">
                {posts?.map(post => <BlogCard  key={post._id} post={post}></BlogCard>)}
            </div>


        </div>
        </div>
    );
};

export default PopularPosts;