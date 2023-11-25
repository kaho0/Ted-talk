import { Link } from 'react-router-dom';
import Container from '../Container';
import MenuDropdown from './MenuDropdown';

const Navbar = () => {
  return (
    <div className='fixed w-full bg-gray text-white  z-10 bg-opacity-20  shadow-sm'>
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
              <Link to='/contact-us'>Membership</Link>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/menu'>Join Us</Link>
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
