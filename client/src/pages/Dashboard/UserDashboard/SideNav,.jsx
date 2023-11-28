import { FaAd, FaBook, FaCalendar,FaHome, FaList,  FaUsers, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
const SideNav = () => {
    const isAdmin = false;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-full h-[600px] bg-blue-500 text-white">
                <ul className="menu p-4 space-y-3">
                    {isAdmin ? (
                        <>
                            <li className="flex items-center space-x-2">
                                <FaHome />
                                <span>Admin Home</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaUtensils />
                                <span>Add Items</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaList />
                                <span>Manage Items</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaBook />
                                <span>Manage Bookings</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaUsers />
                                <span>All Users</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="flex items-center space-x-2">
                                <FaHome />
                                <Link to='/'>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaCalendar />

                                <Link to='/dash/manage'>
                                    <span>My Posts</span>
                                </Link>

                            </li>

                            <li className="flex items-center space-x-2">
                                <FaAd />
                                <Link to='/dash/post'>
                                    <span>New Post</span>
                                </Link>

                            </li>
                            <li className="flex items-center space-x-2">
                                <FaList />
                                <Link to='/dash/interactions'>
                                    <span>Interactions on my posts</span>
                                </Link>

                            </li>
                        </>
                    )}
                    {/* shared nav links */}

                </ul>
            </div>
        </div>
    );
};

export default SideNav;
