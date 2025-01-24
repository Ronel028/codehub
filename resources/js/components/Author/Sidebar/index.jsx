import React, { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import SidebarLinkGroup from './SidebarLinkGroup';
import { FaBlog, FaChevronDown, FaLaptopCode, FaRegUser } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { LuLayoutDashboard, LuUserCog } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { BsFillPinAngleFill } from "react-icons/bs";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { url } = usePage()

  
  return (
    <aside className=' bg-primary'>
      <div className=' w-[260px] px-5 py-6'>
        <div className=' flex items-center justify-center mb-7'>
          <Link href="/" className="flex items-center font-bold text-red-400 font-courier-prime text-xl">
              C
              <FaLaptopCode className="px-[0.0625rem] text-xl text-light-gray" />
              DE HUB
          </Link>
        </div>
        <div>
          <h3 className=' text-sm text-soft-light mb-3 font-bold'>Main</h3>
          <ul className=' flex flex-col gap-2'>
            <li>
              <Link href='/author/dashboard' className=' py-2 px-3 flex items-center gap-2 text-sm text-soft-light hover:bg-secondary rounded-md'>
                  <span className='block'>
                    <LuLayoutDashboard className=' text-base' />
                  </span>
                  Dashboard
              </Link>
            </li>
            <li>
              <Link href='/author/profile/edit' className=' py-2 px-3 flex items-center gap-2 text-sm text-soft-light hover:bg-secondary rounded-md'>
                  <span className='block'>
                    <LuUserCog className=' text-base' />
                  </span>
                  Manage Profile
              </Link>
            </li>
            {/* <SidebarLinkGroup name={'Profile'} icon={<FiUser className="text-base align-middle" />}>
              <li>
                <Link href="/author/profile" className=" flex items-center gap-2 text-sm">
                  View
                </Link>
              </li>
              <li>
                <Link href="/author/profile/edit" className=" flex items-center gap-2 text-sm">
                  Manage Profile
                </Link>
              </li>
            </SidebarLinkGroup> */}
            <SidebarLinkGroup name={'Posts'} icon={<BsFillPinAngleFill className="text-base align-middle" />}>
              <li>
                <Link href="#" className=" text-soft-light hover:text-yellow-light flex items-center gap-2 text-xs">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-soft-light hover:text-yellow-light flex items-center gap-2 text-xs">
                  Create New
                </Link>
              </li>
              <li>
                <Link href="#" className="text-soft-light hover:text-yellow-light flex items-center gap-2 text-xs">
                  Drafts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-soft-light hover:text-yellow-light flex items-center gap-2 text-xs">
                  Published
                </Link>
              </li>
            </SidebarLinkGroup>
          </ul>
        </div>
      </div>
    </aside>
  )
};

export default Sidebar;
