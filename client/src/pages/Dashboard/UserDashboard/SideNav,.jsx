import { Link, useLocation } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

const SideNav = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (isAdminLoading) return <span className="loading loading-dots loading-lg"></span>;

    const isTabActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-full h-[500px] bg-purple-500  text-black rounded-xl">
                <ul className="menu p-4 space-y-3">
                    {isAdmin ? (
                        <>
                            <Link to="/">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/') && 'bg-white'}`}>
                                    <span>Home</span>
                                </li>
                            </Link>
                            <Link to="/dash/profile">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/profile') && 'bg-gray-300'}`}>
                                    <span>Profile</span>
                                </li>
                            </Link>

                            <Link to="/dash/makeannoucement">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/makeannouncement') && 'bg-gray-300'}`}>
                                    <span>Make Announcements</span>
                                </li>
                            </Link>

                            <Link to="/dash/manageusers">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/manageusers') && 'bg-gray-300'}`}>
                                    <span>Manage Users</span>
                                </li>
                            </Link>

                            <Link to="/dash/analytics">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/analytics') && 'bg-gray-300'}`}>
                                    <span>Analytics</span>
                                </li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/') && 'bg-gray-300'}`}>
                                    <span>Home</span>
                                </li>
                            </Link>

                            <Link to="/dash/profile">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/profile') && 'bg-gray-300'}`}>
                                    <span>Profile</span>
                                </li>
                            </Link>

                            <Link to="/dash/manage">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/manage') && 'bg-gray-300'}`}>
                                    <span>My Posts</span>
                                </li>
                            </Link>

                            <Link to="/dash/post">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/post') && 'bg-gray-300'}`}>
                                    <span>New Post</span>
                                </li>
                            </Link>

                            <Link to="/dash/interactions">
                                <li className={`flex items-center btn space-x-2 ${isTabActive('/dash/interactions') && 'bg-gray-300'}`}>
                                    <span>Interactions on my posts</span>
                                </li>
                            </Link>
                        </>
                    )}
                    {/* shared nav links */}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;
