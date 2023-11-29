import { useState, useEffect } from "react";
import AxiosPublic from "../../../Axios/AxiosBase";
import { format } from 'date-fns';
import useAuth from "../../../hooks/useAuth";
import GetTotalposts from "../../../hooks/GetTotalposts";
import GetCurrentUser from "../../../hooks/GetCurrentUser";

const CreatePostForm = () => {
     let totalpost={}
     totalpost = GetTotalposts();
    const { totalposts, badge } = totalpost;
    const { user } = useAuth();
    const userdata = GetCurrentUser()
    const name = userdata.name
    const image = userdata.profilepic
    const email = user?.email
    const visivility = 'public'
    const upvotes = 0
    const downvotes = 0
    const tags = [
        'Technology', 'Travel', 'Food', 'Fashion', 'Health', 'Science', 'Business',
        'Sports', 'Music', 'Art', 'Movies', 'Books', 'Fitness', 'Lifestyle', 'Coding',
    ];
    const comments = []


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        selectedTag: tags[0],
    });
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();
        const formattedTime = format(now, "do MMMM, hh:mm a");
        setCurrentTime(formattedTime);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);
        const payload = { ...formData, name, image, email, dateTime: currentTime, visivility, upvotes, downvotes, comments };
        console.log(payload)
        AxiosPublic.post('addBlog', payload).then(res => {
            console.log(res.data);
        });
    };

    // Render logic based on user's badge and total posts
    if (badge === 'silver' && totalposts >= 5) {
        return (
            <div className="max-w-4xl mx-auto bg-white p-8">
                <p className="text-red-500 text-lg font-semibold">You have reached the limit of 5 posts with a silver badge.</p>
                <p className="text-blue-500 text-lg font-semibold">Upgrade to a gold badge by purchasing our membership to post without limitations!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto shadow-xl bg-white p-8">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-semibold text-gray-600 mb-1">
                    Tags
                </label>
                <select
                    id="tags"
                    name="selectedTag"
                    value={formData.selectedTag}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                >
                    {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-600 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-600 mb-1">
                    Date and Time
                </label>
                <input
                    type="text"
                    id="dateTime"
                    name="dateTime"
                    value={currentTime}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    readOnly
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Create Post
                </button>
            </div>
        </form>
    );
};

export default CreatePostForm;
