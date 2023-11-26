import { Outlet } from "react-router-dom";
import SideNav from "../pages/Dashboard/UserDashboard/SideNav,";

const UserDashboard = () => {
    return (
        <div className="flex mt-5 max-w-7xl">
            <div className="w-[20%]">
                <SideNav></SideNav>

            </div>
            <div className="w-[80%]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UserDashboard;