/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";

const BlogCard = ({ title, count }) => (
    <div className="bg-white p-4 rounded shadow-md mb-4 h-[200px]">
        <p className="text-lg font-bold">{title}:</p>
        <p className="text-lg">{count}</p>
    </div>
);

const Analytics = () => {
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        AxiosPublic.get('allblogs')
            .then(res => setBlogs(res.data));
    }, []);

    useEffect(() => {
        let totalUpvotes = 0;
        let totalDownvotes = 0;

        blogs.forEach(blog => {
            totalUpvotes += blog.upvotes || 0;
            totalDownvotes += blog.downvotes || 0;
        });

        setUpvotes(totalUpvotes);
        setDownvotes(totalDownvotes);
        setTotalBlogs(blogs.length);
    }, [blogs]);

    return (
        <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BlogCard title="Total Upvotes" count={upvotes} />
            <BlogCard title="Total Downvotes" count={downvotes} />
            <BlogCard title="Total Blogs" count={totalBlogs} />
        </div>
    );
};

export default Analytics;
