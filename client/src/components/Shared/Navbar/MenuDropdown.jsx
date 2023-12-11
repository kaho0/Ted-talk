// ... (other imports)

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import GetCurrentUser from "../../../hooks/GetCurrentUser";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai'
import avatarImg from '../../../assets/images/placeholder.jpg'

// ... (other imports)

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  let userdata = GetCurrentUser();

  return (
    <div className='relative flex items-center'>
      {/* Content for users */}
      {user && (
        <div className='hidden md:flex items-center space-x-3'>
          <button className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition'>
            <p>Hi, {userdata?.name}</p>
          </button>
          <button
            className='px-4 py-3 hover:bg-blue-500 transition font-semibold'
            onClick={() => {
              logOut();
              userdata = {};
            }}
          >
            Log out
          </button>
        </div>
      )}

      {/* Dropdown button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition'
      >
        <AiOutlineMenu />
        <div className='hidden md:flex flex-col items-end'>
          {/* Avatar */}
          <img
            className='rounded-full'
            referrerPolicy='no-referrer'
            src={userdata && userdata?.profilepic ? userdata.profilepic : avatarImg}
            alt='profile'
            height='20'
            width='30'
          />
        </div>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className='absolute mt-2 right-0'>
          <div className='bg-gray-500 rounded-xl shadow-md w-[40vw] md:w-[10vw] text-sm'>
            <div className='cursor-pointer'>
              <Link
                to={user ? '/dashboard' : '/login'}
                className='px-4 py-3 hover:bg-blue-500 transition font-semibold block'
              >
                {user ? 'Dashboard' : 'Login'}
              </Link>
            </div>

            {!user && (
              <div className='cursor-pointer'>
                <Link
                  to='/signup'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold block'
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
