import { Link } from "@inertiajs/react"
import { CiEdit } from "react-icons/ci";

const Navigation  = () => {
    return (
        <>
            <div className=" bg-gray-50 fixed top-0 left-0 right-0 z-50 border-b border-light-gray">
                <nav className=" flex items-center justify-between py-4 max-w-[1500px] w-[90%] mx-auto">
                    <h2>Title</h2>
                    <ul className=" flex items-center gap-10">
                        <li>
                            <Link href="/blog/create" className="flex items-center gap-2 text-sm">
                                <CiEdit className=" text-base" />
                                Write
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="  text-primary text-sm rounded tracking-wide">
                                Signin
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className=" bg-primary text-light py-2 px-3 text-sm rounded tracking-wide">
                                Signup
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation