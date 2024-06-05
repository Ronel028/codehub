import { Link } from "@inertiajs/react";
import MainLayout from "../../layout/main";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const Profile = (props) => {

    console.log(props.user);

    return (
        <>
            <MainLayout>
                <main className=" grid grid-cols-[79%_20%] gap-[1%]">
                    <section>
                        <div className=" h-60 w-full overflow-hidden rounded-t-md">
                            <img className=" h-full w-full object-cover" src="https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className=" px-4 pb-8 pt-5 shadow mb-4 flex items-start justify-between">
                            <div className=" flex gap-2 items-start">
                                <div className=" -mt-24 w-32 h-32 overflow-hidden rounded-full shadow-md ">
                                    <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80" alt="" />
                                </div>
                                <div className="">
                                    <h2 className=" text-3xl font-bold tracking-wide mb-1">{props.user.full_name}</h2>
                                    <p className=" text-xs tracking-wide mb-4">{props.user.user_detail === null ? props.user.user_detail.address : 'N/A'}</p>
                                    <div>
                                        {
                                            props.user.user_detail.experiences.length > 0 ? props.user.user_detail.experiences.map((experience, index) => (
                                                <span key={index} className="bg-light text-primary text-xs font-medium me-2 px-2.5 py-0.5 rounded ">{experience}</span>
                                            )) : <p>N/A</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className=" flex items-center gap-2">
                                <Link href="/profile/edit" className=" px-3 py-2 border border-primary rounded-md text-xs tracking-wide font-semibold flex items-center gap-2">
                                    <CiEdit className=" text-base" />
                                    Edit Profile
                                </Link>
                                <button className=" px-3 py-2 border bg-primary text-light border-primary rounded-md text-xs tracking-wide font-semibold">Visit Website</button>
                            </div>
                        </div>
                        <div className=" px-4 pb-8 pt-5 shadow">
                            <h2 className=" text-base font-bold tracking-wide mb-1">About Ronel Florida</h2>
                            <p className=" text-xs tracking-wide mb-4">
                                {props.user.user_detail.about}
                            </p>
                        </div>
                    </section>
                    <section>
                        <div className=" px-4 py-5 shadow">
                            <h2 className=" text-lg font-bold tracking-wide mb-2">Connect</h2>
                            <ul className=" flex flex-col gap-3 text-xs tracking-wide">
                                <li className=" flex items-center gap-2">
                                    <CiFacebook className=" text-lg" />
                                    <Link href={props.user.user_detail.soc_fb ?? '/'} className=" hover:underline">{props.user.user_detail.soc_fb ?? 'N/A'}</Link>
                                </li>
                                <li className=" flex items-center gap-2">
                                    <FaLinkedinIn  className=" text-lg" />
                                    <Link href={props.user.user_detail.soc_fb ?? '/'}  className=" hover:underline">{props.user.user_detail.soc_linkedin ?? 'N/A'}</Link>
                                </li>
                                <li className=" flex items-center gap-2">
                                    <FaSquareXTwitter className=" text-lg" />
                                    <Link href={props.user.user_detail.soc_fb ?? '/'}  className=" hover:underline">{props.user.user_detail.soc_twitter ?? 'N/A'}</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                </main>
            </MainLayout>
        </>
    )
}

export default Profile;