import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import BlogCard from "../Blogs/Blogcard";

const RecentBlogs = () => {
    const [posts, setposts] = useState([])

    useEffect(() => {
        AxiosPublic.get('recentblogs')
            .then(res => {
                setposts(res.data)
            })


    }, [])
    return (
        <div className="mt-10">

            <div className="text-4xl font-bold text-gray-600 mb-6 text-center">
                Recent Blog Entries
            </div>

            <div className="flex justify-between ">
                {posts.map(post => <BlogCard key={post._id} post={post}></BlogCard>)}
            </div>
            <div className="text-xl font-semibold text-gray-800 mt-2 text-center hover:text-blue-500">
                View All Blogs
            </div>
        </div>
    );
};

export default RecentBlogs;