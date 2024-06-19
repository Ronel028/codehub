import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react"
import { FaUserCircle, FaSignOutAlt, FaEdit  } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import imagePlacholder from "../Assets/Img/image-placeholder.webp"
import Input from "./Forms/Input";

const Navigation  = (props) => {

    const { url, component } = usePage()
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
            <div className=" bg-[#0d1b2a] fixed top-0 left-0 right-0 z-50 border-b border-[#415A77]">
                <nav className=" flex items-center justify-between py-3 max-w-[1500px] w-[90%] mx-auto relative">
                    <Link href="/">
                        <h2 className=" text-gray-50">Title</h2>
                    </Link>
                    <ul className=" flex items-center gap-8">
                        <li>
                            <Link href="/blog-list" className={`${ url.startsWith('/blog-list') ? 'text-red-400 font-bold' : 'text-[#E0E1DD]' } flex items-center gap-2 text-xs tracking-wide`}>
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`${ url === '/about' ? 'text-red-400 font-bold' : 'text-[#E0E1DD]' } flex items-center gap-2 text-xs tracking-wide`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`${ url === '/contact' ? 'text-red-400 font-bold' : 'text-[#E0E1DD]' } flex items-center gap-2 text-xs tracking-wide`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <ul className=" flex items-center gap-7">
                        {
                            url.startsWith('/blog-list/blog') || url.startsWith('/blog/list') ? (
                                <li>
                                    <Input placeholder={`Search blog related to ${props.category}...`} value={props.search} onChange={props.setSearch} />
                                </li>
                            ) : ''
                        }
                        <li>
                            <Link href="/blog/create" className="flex items-center shadow gap-2 text-xs bg-[#415a77] text-light py-2 px-3 rounded-md">
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
                                className={`${openMenu ? 'flex' : 'hidden'} absolute z-10 flex min-w-[180px] right-0 top-13 flex-col gap-2 overflow-auto rounded-md border border-[#415A77] bg-[#1b263b] p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`}>
                                <Link href="/profile"
                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <FaUserCircle className=" text-lg" />
                                    <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                        My Profile
                                    </p>
                                </Link>
                                <Link href="/blog/list"
                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <MdOutlinePostAdd className=" text-lg" />
                                    <p className="block font-sans text-xs antialiased font-medium leading-normal text-inherit">
                                        Blog Post
                                    </p>
                                </Link>
                                <hr className="my-2 border-[#415A77]" role="menuitem" />
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