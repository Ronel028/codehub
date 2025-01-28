import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SidebarLinkGroup = ({ children, name, icon, activeRoute }) => {
  const [menuOpen, isMenuOpen] = useState(false)

  function handleOpenMenu(){
    isMenuOpen(prevState => !prevState)
  }

  return (
    <li>
      <button onClick={handleOpenMenu} className={`${activeRoute ? 'bg-secondary' : ''} w-full py-2 px-3 flex items-center justify-between gap-2 text-sm text-soft-light hover:bg-secondary rounded-md`}>
        <div className=' flex items-center gap-2'>
          {icon}
          {name}
        </div>
        <FaChevronDown className={`${menuOpen ? 'rotate-180' : ''} text-sm align-middle`} />
      </button>
      {
        menuOpen ? (
          <ul className='mt-3 pl-7 flex flex-col gap-4'>
            {children}
          </ul>
        ): null
      }
    </li>
  )
}

export default SidebarLinkGroup
