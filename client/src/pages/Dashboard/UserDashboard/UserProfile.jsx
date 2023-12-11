import GetCurrentUser from '../../../hooks/GetCurrentUser';
import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    const userdata = GetCurrentUser();

    return (
        <div className="w-full ml-[280px] mt-[40px]">
                <img
                    src={userdata?.profilepic}
                    alt="Profile"
                    className="w-48 h-48 rounded-full mr-4"
                />
                <div>
                    <h1 className="text-2xl font-semibold mb-2 mt-1">Welcome, {userdata?.name}!</h1>
                    <p className="text-lg font-semibold mb-2">Name:{userdata?.name}</p>
                    <p className="text-gray-600">Email:{user?.email}</p>

                    {userdata.badge && (
                        <div className="mt-2">
                            <span className="text-orange-500 rounded-md font-semibold">
                                Badge: {userdata?.badge}
                            </span>
                        </div>
                    )}
                </div>
        </div>
    );
};

export default UserProfile;
