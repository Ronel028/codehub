import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react"
import { FaBlog } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { BsPersonLock } from "react-icons/bs";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";
import imagePlacholder from "../Assets/Img/cypher.jpg"
// import Input from "./Forms/Input";
import Input from "../../components/Forms/Input"
import { PiFolderUserBold } from "react-icons/pi";

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
            <div className=" bg-[#F7F7F7] fixed top-0 left-0 right-0 z-50 border-b border-gray-light">
                <nav className=" flex items-center justify-between py-3 max-w-[1500px] w-[90%] mx-auto relative">
                    <Link href="/" className="flex items-center font-bold text-red-400 font-courier-prime text-xl">
                        C
                        <FaLaptopCode className="px-[0.0625rem] text-xl text-meduim-gray" />
                        DE HUB
                    </Link>
                    <ul className=" hidden sm:flex items-center gap-8">
                        <li>
                            <Link href="/" className={`${url === '/' ? 'text-red-400 font-bold' : 'text-dark-gray'} flex items-center gap-2 text-xs tracking-wide`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog-list" className={`${url.startsWith('/blog-list') ? 'text-red-400 font-bold' : 'text-dark-gray'} flex items-center gap-2 text-xs tracking-wide`}>
                                Blogs
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
                        {/* <li>
                            <Link href="/blog/create" className="flex items-center font-bold gap-1 text-sm border border-gray-light text-dark-gray py-1 px-2 rounded-md transition-colors ease-linear duration-200">
                                <RiStickyNoteAddLine />
                                Write
                            </Link>
                        </li> */}
                        <li>
                            <Link href={`/author/post?create=${true}`} className="flex items-center font-bold gap-1 text-sm border border-gray-light text-dark-gray py-1 px-2 rounded-md transition-colors ease-linear duration-200">
                                <RiStickyNoteAddLine />
                                Write
                            </Link>
                        </li>
                        <li>
                            <button onClick={open} className=" border border-[#415a77] w-8 h-8 rounded-full align-middle hover:opacity-90 transition-opacity ease-linear duration-200">
                                {
                                    props.user ? (
                                        <img
                                            src={props.user.avatar?.path ?? imagePlacholder}
                                            alt={props.user.avatar?.filename ?? 'user'}
                                            className=" aspect-square rounded-full cursor-pointer" />
                                    ) : (
                                        <img src={imagePlacholder} alt="user" className="object-cover w-full h-full rounded-full cursor-pointer" />
                                    )
                                }
                            </button>
                            <ul
                                className={`${openMenu ? 'flex' : 'hidden'} divide-y absolute z-10 flex min-w-[180px] right-0 top-12 flex-col overflow-auto rounded-md border bg-[#F7F7F7] border-gray-light font-sans text-sm font-normal text-blue-gray-500 focus:outline-none`}>
                                {
                                    props.user ? (
                                        <>
                                            <Link href="/author/dashboard"
                                                className="flex w-full cursor-pointer text-dark-gray hover:bg-dark-gray/70 hover:text-soft-light select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <PiFolderUserBold className=" text-xl" />
                                                <span className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                    Author Panel
                                                </span>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login"
                                                className="flex w-full cursor-pointer text-dark-gray hover:bg-dark-gray/70 hover:text-soft-light select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <BsPersonLock className=" text-base" />
                                                <span className="block font-sans text-sm antialiased font-bold leading-normal text-inherit">
                                                    Signin
                                                </span>
                                            </Link>
                                            <Link href="/register"
                                                className="flex w-full cursor-pointer text-dark-gray hover:bg-dark-gray/70 hover:text-soft-light select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <FiUserPlus className=" text-base" />
                                                <span className="block font-sans text-sm antialiased font-bold leading-normal text-inherit">
                                                    Create Account
                                                </span>
                                            </Link>
                                        </>
                                    )
                                }
                                {
                                    props.user ? (
                                        <>
                                            <button onClick={logout}
                                                className="group flex w-full cursor-pointer text-dark-gray hover:bg-red-100 select-none items-center gap-2 px-3 py-2 text-start leading-tight outline-none transition-all ease-linear duration-200">
                                                <IoIosLogOut className=" text-base group-hover:fill-red-500" />
                                                <p className="block font-sans group-hover:text-red-500 text-sm antialiased font-bold leading-normal text-inherit">
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