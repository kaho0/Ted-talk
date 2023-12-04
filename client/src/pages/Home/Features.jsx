/* eslint-disable react/prop-types */



const FeatureSections = () => {
    return (
        <div>
            <div className=" text-black text-center mt-8 ">
                <h1 className="text-4xl font-bold">Unleash Your Reading Experience: Explore Blogs, Engage with Users!</h1>
            </div>

            <div className="max-w-6xl mx-auto mt-4">


                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">


                     <div className="md:w-1/2 mb-4 md:mb-0 order-2 md:order-1">
                        <img src='https://i.ibb.co/0sW6k1K/12704404-4968851.jpg' className="w-auto h-[300px] rounded-lg ml-4" />
                    </div>



                    <div className="md:w-1/2 text-center md:text-left order-1 md:order-2">
                        <h2 className="text-2xl font-bold mb-4"><span className="text-4xl font-bold">Blog</span> Features</h2>
                        <p className="text-xl text-gray-700">
                            Discover and explore blogs easily. Search for specific blogs,
                            filter them based on categories, and stay updated with the most recent and popular blogs.


                        </p>
                    </div>



                </div>

                <div className="flex flex-col md:flex-row items-center justify-between md:justify-between mb-8">
                    <div className="md:w-1/2 mb-4 md:mb-0 order-1 md:order-2">
                        <img src='https://i.ibb.co/gPYLzWX/6192594-3125988.jpg' className="w-auto h-[300px] rounded-lg" />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
                        <h2 className="text-2xl font-bold mb-4"><span className="text-4xl font-bold">User</span> Features</h2>
                        <p className="text-xl text-gray-700">
                            Empower your voice in the community. Create your own blog posts, express your opinions
                            through upvotes and downvotes, and engage in discussions by adding comments to your favorite blogs.


                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default FeatureSections;

