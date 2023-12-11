import { Outlet } from "react-router-dom";
import Container from "../components/Shared/Container";
import SideNav from "../pages/Dashboard/UserDashboard/SideNav,";

const UserDashboard = () => {
    return (
        <div className="bg-blue-500 min-h-screen">
            <Container>
                <div className="flex justify-center ">
                    <div className="w-full max-w-6xl">
                        <div className="bg-white rounded-2xl shadow-xl mt-16 ">
                            <div className="flex ">
                                <div className="w-[20%]">
                                    <SideNav />
                                </div>
                                <div className="">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default UserDashboard;
