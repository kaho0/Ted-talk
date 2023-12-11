import { Link } from "react-router-dom";
import AxiosPublic from "../../Axios/AxiosBase";
import BlogCard from "../Blogs/Blogcard";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
const RecentBlogs = () => {


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['recentposts'],
        queryFn: async () => {
            const res = await AxiosPublic.get('recentblogs')
            console.log(res.data)
            return res.data;
        }
    })


    if (!data || isLoading) {
        return (
            <div className="text-center">
                <span className="loading loading-dots loading-lg"></span>
                <p className="text-purple-500">Data loading, please refresh if the issue persists.</p>
            </div>
        );
    }


    return (


        <div>
            <div className="text-4xl font-bold text-gray-600 mb-6 text-center">
                Recent Blog Entries
            </div>
            <Marquee>

                <div className="mt-10">


                    <div>

                    </div>
                    <div className="flex justify-between ">
                        {data?.map(post => <BlogCard key={post._id} post={post} refetch={refetch}></BlogCard>)}
                    </div>

                </div>
            </Marquee>
            <Link to='/allblogs'>

                <div className="text-xl font-semibold text-gray-800 mt-2 text-center hover:text-blue-500">
                    View All Blogs
                </div>
            </Link>


        </div>


    );
};

export default RecentBlogs;