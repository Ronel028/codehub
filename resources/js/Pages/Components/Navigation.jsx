import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react"
import { FaUserCircle, FaSignOutAlt, FaEdit, FaUserLock, FaRegUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlinePostAdd, MdOutlineSignpost } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoCodeSlashSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { BsPersonLock } from "react-icons/bs";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { AiOutlineCodepenCircle } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import imagePlacholder from "../Assets/Img/image-placeholder.webp"
import knowl from "../Assets/Img/knowl-logo.png"
import Input from "./Forms/Input";

const Navigation = (props) => {

    const { url, component } = usePage()
    const [openMenu, setOpenMenu] = useState(false)

    const open = () => {
        setOpenMenu(prevState => !prevState)
    }

    const logout = (e) => {
        e.preventDefault()
        router.post('/logout')
    }

    return (
        <>
            <div className=" bg-[#0d1b2a] fixed top-0 left-0 right-0 z-50 border-b border-[#415A77]">
                <nav className=" flex items-center justify-between py-3 max-w-[1500px] w-[90%] mx-auto relative">
                    <Link href="/" className="flex items-center font-bold text-red-400 font-courier-prime text-xl">
                        C
                        <FaLaptopCode className="px-[0.0625rem] text-xl text-light-gray" />
                        DE HUB
                    </Link>
                    <ul className=" hidden sm:flex items-center gap-8">
                        <li>
                            <Link href="/blog-list" className={`${url.startsWith('/blog-list') ? 'text-red-400 font-bold' : 'text-[#E0E1DD]'} flex items-center gap-2 text-xs tracking-wide`}>
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`${url === '/about' ? 'text-red-400 font-bold' : 'text-[#E0E1DD]'} flex items-center gap-2 text-xs tracking-wide`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`${url === '/contact' ? 'text-red-400 font-bold' : 'text-[#E0E1DD]'} flex items-center gap-2 text-xs tracking-wide`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <ul className=" flex items-center gap-7">
                        {
                            url.startsWith('/blog-list/blog') || url.startsWith('/blog/list') ? (
                                <li>
                                    <Input placeholder='Search...' value={props.search} onChange={props.setSearch} />
                                </li>
                            ) : ''
                        }
                        <li>
                            <Link href="/blog/create" className="flex items-center font-bold shadow gap-1 text-xs border border-[#415a77] hover:bg-[#415a77] text-light py-1 px-2 rounded transition-colors ease-linear duration-200">
                                <RiStickyNoteAddLine className=" text-sm fill-light" />
                                Write
                            </Link>
                        </li>
                        <li>
                            <button onClick={open} className=" border border-[#415a77] w-7 h-7 rounded-full align-middle hover:opacity-90 transition-opacity ease-linear duration-200">
                                {
                                    props.user ? (
                                        <img
                                            src={(props.user.upload && props.user.upload.path) ?? imagePlacholder}
                                            alt={(props.user.upload && props.user.upload.filename) ?? 'user'}
                                            className=" object-cover w-full h-full rounded-full cursor-pointer" />
                                    ) : (
                                        <img src={imagePlacholder} alt="user" className="object-cover w-full h-full rounded-full cursor-pointer" />
                                    )
                                }
                            </button>
                            <ul
                                className={`${openMenu ? 'flex' : 'hidden'} absolute z-10 flex min-w-[180px] right-0 top-14 flex-col overflow-auto rounded-md border border-[#415A77] bg-[#1b263b] font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                                {
                                    props.user ? (
                                        <>
                                            <Link href="/profile"
                                                className="flex w-full cursor-pointer hover:bg-secondary select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <FaRegUser className=" text-sm" />
                                                <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                                    My Profile
                                                </p>
                                            </Link>
                                            <Link href="/blog/list"
                                                className="flex w-full cursor-pointer hover:bg-secondary select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <MdOutlineSignpost className=" text-base" />
                                                <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                                    Blog Post
                                                </p>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login"
                                                className="flex w-full cursor-pointer hover:bg-secondary select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <BsPersonLock className=" text-base" />
                                                <p className="block font-sans text-xs antialiased font-bold leading-normal text-inherit">
                                                    Signin
                                                </p>
                                            </Link>
                                            <Link href="/register"
                                                className="flex w-full cursor-pointer hover:bg-secondary select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <FiUserPlus className=" text-base" />
                                                <p className="block font-sans text-xs antialiased font-bold leading-normal text-inherit">
                                                    Create Account
                                                </p>
                                            </Link>
                                        </>
                                    )
                                }
                                {
                                    props.user ? (
                                        <>
                                            {/* <hr className=" border-[#415A77]" role="menuitem" /> */}
                                            <button onClick={logout}
                                                className="group flex w-full cursor-pointer hover:bg-red-100 select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <IoIosLogOut className=" text-sm group-hover:fill-red-500" />
                                                <p className="block font-sans group-hover:text-red-500 text-xs antialiased font-bold leading-normal text-inherit">
                                                    Sign Out
                                                </p>
                                            </button>
                                        </>
                                    ) : null
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation