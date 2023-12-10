import AxiosPublic from "../../Axios/AxiosBase";
import BlogCard from "../Blogs/Blogcard";
import { useQuery } from "@tanstack/react-query";

const PopularPosts = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['popularposts'],
        queryFn: async () => {
            const res = await AxiosPublic.get('popularposts')
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
            <div className="mt-10">

                <div className="text-4xl font-bold text-gray-600 mb-6 text-center">
                    Popular Blog Entries
                </div>

                <div className="flex justify-between ">
                    {data?.map(post => <BlogCard key={post._id} post={post} refetch={refetch}></BlogCard>)}
                </div>


            </div>
        </div>
    );
};

export default PopularPosts;