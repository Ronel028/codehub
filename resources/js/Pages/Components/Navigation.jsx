import { useState } from "react";
import { Link, router } from "@inertiajs/react"
import { CiEdit } from "react-icons/ci";
import { FaUserCircle, FaSignOutAlt, FaEdit  } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import imagePlacholder from "../Assets/Img/image-placeholder.webp"

const Navigation  = (props) => {

    const [openMenu, setOpenMenu] = useState(false)

    const open = () => {
        setOpenMenu(prevState => ! prevState)
    }

    const logout = (e) => {
        e.preventDefault()
        router.post('/logout')
    }

    return (
        <>
            <div className=" bg-gray-50 fixed top-0 left-0 right-0 z-50 border-b border-light-gray">
                <nav className=" flex items-center justify-between py-3 max-w-[1500px] w-[90%] mx-auto relative">
                    <Link href="/">
                        <h2>Title</h2>
                    </Link>
                    <ul className=" flex items-center gap-10">
                        <li>
                            <Link href="/blog/create" className="flex items-center shadow gap-2 text-xs bg-secondary text-light py-2 px-3 rounded-md">
                                {/* <CiEdit className=" text-base fill-light" /> */}
                                <FaEdit className=" text-sm fill-light" />
                                Write
                            </Link>
                        </li>
                        <li>
                            <button onClick={open} className=" border border-secondary rounded-full">
                                <img
                                    src={(props.user.upload && `/storage/${props.user.upload.path}`) ?? imagePlacholder}
                                    alt={(props.user.upload && props.user.upload.filename) ?? 'user'}
                                    className="relative inline-block object-cover object-center w-8 h-8 rounded-full cursor-pointer" />
                            </button>
                            <ul
                                className={`${openMenu ? 'flex' : 'hidden'} absolute z-10 flex min-w-[180px] right-0 top-12 flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                                <Link href="/profile"
                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <FaUserCircle className=" text-lg" />
                                    <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                        My Profile
                                    </p>
                                </Link>
                                <Link href="/blog/blog-list"
                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <MdOutlinePostAdd className=" text-lg" />
                                    <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                        Blog Post
                                    </p>
                                </Link>
                                <hr className="my-2 border-blue-gray-50" role="menuitem" />
                                <button onClick={logout}
                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <FaSignOutAlt className=" text-lg" />
                                    <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                        Sign Out
                                    </p>
                                </button>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation