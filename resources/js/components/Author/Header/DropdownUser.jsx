import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ClickOutside from '../../ClickOutside'
import { FaChevronDown, FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import profilePlaceholder from '../../../assets/img/cypher.jpg';

const DropdownUser = (props) => {
  const { user } = props
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = (e) => {
      e.preventDefault()
      router.delete('/logout')
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-bold text-primary">
            {user.user_detail?.full_name ?? user.username}
          </span>
          <span className="block text-xs text-gray-500">{user.user_detail?.tagline ?? null}</span>
        </span>

        <img className='w-10 rounded-full border border-primary/60 aspect-square' src={user.avatar?.path ?? profilePlaceholder} alt={user.user_detail?.full_name ?? user.username} />
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
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out text-primary lg:text-base"
              >
                <IoSettingsOutline />
                Account Settings
              </Link>
            </li>
          </ul>
          <button onClick={logout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-red-500 hover:font-bold lg:text-base">
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
