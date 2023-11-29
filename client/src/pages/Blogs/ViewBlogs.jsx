import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import SearchSection from "../Home/SearchSection";
import BlogCard from "./Blogcard";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Container from "../../components/Shared/Container";

const ViewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        AxiosPublic.get('/allblogs')
            .then((res) => {
                setBlogs(res.data);
                setAllBlogs(res.data); 
            });
    }, []);

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
