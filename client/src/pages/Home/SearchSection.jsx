import React from 'react';
import Header from '../../components/Shared/Header/Header';

const SearchSection = () => {
  // Dummy data for tags
  const tags = [
    'Technology', 'Travel', 'Food', 'Fashion', 'Health', 'Science', 'Business',
    'Sports', 'Music', 'Art', 'Movies', 'Books', 'Fitness', 'Lifestyle', 'Coding',
  ];

  return (
   <div className='mt-10'>
<Header title='Explore a world of knowledge with our curated tags'></Header>

 <div className="bg-blue-400 p-4">
      <div className="flex items-center justify-between ">
        {/* Search Field */}
        <div className="flex-grow pr-4 w-[60%]">
          <input
            type="text"
            placeholder="Type tags to search..."
            className="w-[75%] p-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <p className="text-black  text-2xl mt-2">Type tags to search (e.g., Technology, Travel)</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 w-[40%]">
          {tags.map((tag, index) => (
            <div key={index} className="bg-white text-black p-2 rounded-md cursor-pointer">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>














</div>
  );
};

export default SearchSection;
