import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import SearchSection from "../Home/SearchSection";
import BlogCard from "./Blogcard";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";

const ViewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);

 
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allblogs'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/allblogs')
            setAllBlogs(res.data)
            setBlogs(res.data)
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





    const handleSearch = (tag) => {
        if (!tag) {
            setBlogs(allBlogs);
        } else {
            const filteredBlogs = allBlogs.filter(blog => blog.selectedTag === tag);
            setBlogs(filteredBlogs);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div>
                    <SearchSection handleSearch={handleSearch}></SearchSection>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                    {blogs.map(blog => <BlogCard key={blog._id} post={blog}></BlogCard>)}
                </div>
            </Container>
        </div>
    );
};

export default ViewBlogs;
