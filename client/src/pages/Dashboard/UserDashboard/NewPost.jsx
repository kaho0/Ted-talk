import React, { useState } from "react";

const CreatePostForm = () => {
    const tags = [
        'Technology', 'Travel', 'Food', 'Fashion', 'Health', 'Science', 'Business',
        'Sports', 'Music', 'Art', 'Movies', 'Books', 'Fitness', 'Lifestyle', 'Coding',
    ];
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        selectedTag: tags[0],
        dateTime: getCurrentDateTime(),
    });


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
    };

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


            {/* Description Field */}
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

            {/* Tags Field */}

            {/* Date and Time Field */}
            {/* <div className="mb-4">
                <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-600 mb-1">
                    Date and Time
                </label>
                <input
                    type="datetime-local"
                    id="dateTime"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                />
            </div> */}

            {/* Submit Button */}
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
