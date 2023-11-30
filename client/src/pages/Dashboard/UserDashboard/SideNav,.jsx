import { FaAd,  FaCalendar, FaHome, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
const SideNav = () => {
    const isAdmin = useAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-full h-[600px] bg-blue-500 text-white">
                <ul className="menu p-4 space-y-3">
                    {isAdmin ? (
                        <>
                            <Link to='/'>
                                <li className="flex items-center space-x-2">
                                    <FaHome />
                                    <span>Home</span>
                                </li>
                            </Link>

                            <Link to='/dash/makeannoucement'>
                                <li className="flex items-center space-x-2">
                                    <FaHome />
                                    <span>Make Annoucements</span>
                                </li>
                            </Link>

                            <Link to='/dash/manageusers'>
                                <li className="flex items-center space-x-2">
                                    <FaHome />
                                    <span>Manage Users</span>
                                </li>
                            </Link>

                            <Link to='/dash/analytics'>
                                <li className="flex items-center space-x-2">
                                    <FaHome />
                                    <span>Analytics</span>
                                </li>
                            </Link>

                            {/* <Link to='/'>
                                <li className="flex items-center space-x-2">
                                    <FaHome />
                                    <span></span>
                                </li>
                            </Link> */}
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
