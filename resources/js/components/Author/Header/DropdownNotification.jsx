import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ClickOutside from '../../ClickOutside';
import { IoNotificationsOutline } from "react-icons/io5";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray-200 text-gray-500 hover:text-primary"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <IoNotificationsOutline  className=' text-xl'/>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-sm sm:right-0 sm:w-80`}
          >
            <div className="px-4 py-3">
              <h5 className="text-sm font-medium text-primary">
                Notification
              </h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4 py-3 hover:bg-gray-300"
                  href="#"
                >
                  <p className="text-sm text-light-gray">
                    <span className="text-secondary font-bold">
                      Edit your information in a swipe
                    </span>{' '}
                    Sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim.
                  </p>

                  <p className="text-xs text-light-gray">12 May, 2025</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
