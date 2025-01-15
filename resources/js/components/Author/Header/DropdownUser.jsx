import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ClickOutside from '../../ClickOutside'
import { FaChevronDown, FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
// import UserOne from '../../images/user/user-01.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-primary">
            Thomas Anree
          </span>
          <span className="block text-xs text-light-gray">UX Designer</span>
        </span>

        <img className='w-10 rounded-full aspect-square' src={'https://images.pexels.com/photos/19986271/pexels-photo-19986271/free-photo-of-portrait-of-man-in-sunglasses-and-hat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="User" />
        <FaChevronDown className="hidden fill-current sm:block text-light-gray" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-60 flex-col rounded-sm border border-stroke bg-white shadow-sm`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out text-primary lg:text-base"
              >
                <FaRegUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out text-primary lg:text-base"
              >
                <IoSettingsOutline />
                Account Settings
              </Link>
            </li>
          </ul>
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-red-500 hover:font-bold lg:text-base">
          <MdLogout />
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
