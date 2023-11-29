import { Link } from 'react-router-dom';
import Container from '../Container';
import MenuDropdown from './MenuDropdown';

const Navbar = () => {
  return (
    <div className=' w-full bg-black text-white  z-10 bg-opacity-90  shadow-sm'>
      <div className=' border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center  justify-between gap-3 md:gap-0'>

            {/* Restaurant Name on the Left */}
            <div className='text-lg font-bold ml-4'>
              TagTalk
            </div>

            {/* Left-side Links */}
            <div className='flex space-x-4 '>
              <Link to='/'>Home</Link>
              <Link to='/membership'>Membership</Link>
              <Link to='/dash/profile'>Dashboard</Link>
              <Link to='/signup'>Join Us</Link>
              <Link to='/allblogs'>Blogs</Link>

            </div>

            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
