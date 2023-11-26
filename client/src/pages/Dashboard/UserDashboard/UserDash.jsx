import useAuth from "../../../hooks/useAuth";
import SideNav from "./SideNav,";

const UserDash = () => {
    const { user } = useAuth()
    return (
        <div className=" my-10 flex items-center  ">

            <div className="w-[20%]">
                <SideNav></SideNav>

            </div>

            <div className="bg-white p-8 rounded shadow h-[600px] w-[80%]">
                <h1 className="text-2xl font-semibold mb-4">Welcome, {}!</h1>

                <div className="items-center mb-4">
                    <img
                        // src={}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                        <p className="text-lg font-semibold">{}</p>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                {/* Placeholder for User Posts */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
                    {/* Placeholder for user posts */}
                    <div className="bg-gray-100 p-4 rounded">
                        {/* Add your logic to display user posts here */}
                        <p className="text-gray-600">No posts yet.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserDash;