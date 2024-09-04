import { Link } from "@inertiajs/react";
import MainLayout from "../../layout/main";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import altImage from "../Assets/Img/image-placeholder.webp"

const Profile = (props) => {

    console.log(props);

    return (
        <>
            <MainLayout>
                <main className=" grid grid-cols-[79%_20%] gap-[1%]">
                    <section>
                        <div className=" h-32 w-full overflow-hidden rounded-t-md">
                            <img className=" h-full w-full object-cover" src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className=" px-4 pb-8 pt-5 rounded-b-md border-b border-l border-r border-[#0D1B2A] mb-4 flex items-start justify-between">
                            <div className=" flex gap-2 items-start">
                                <div className=" -mt-16 w-20 h-20 overflow-hidden rounded-full shadow-md border border-light-gray ">
                                    <img
                                        className="h-full w-full object-cover rounded-full"
                                        src={(props.user.upload && props.user.upload.path) ?? altImage}
                                        alt={(props.user.upload && props.user.upload.filename) ?? "image-placeholder"}
                                    />
                                </div>
                                <div className="">
                                    <h2 className=" text-3xl font-bold tracking-wide mb-1">{(props.user.user_detail && props.user.full_name) ?? props.user.username}</h2>
                                    <p className=" text-xs tracking-wide mb-4">{(props.user.user_detail && props.user.user_detail.address) ?? 'N/A'}</p>
                                    <div>
                                        {
                                            props.user.user_detail &&
                                                props.user.user_detail.experiences !== null ? props.user.user_detail.experiences.map((experience, index) => (
                                                    <span key={index} className="border border-[#415A77] hover:bg-[#415A77] text-light text-xs font-medium me-2 px-2.5 py-1 rounded transition-colors ease-linear duration-150 ">{experience}</span>
                                                )) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className=" flex items-center gap-2">
                                <Link href="/profile/edit" className=" border border-[#415A77] hover:bg-[#415A77] transition-colors ease-linear duration-150 rounded-md text-xs px-2 py-2 text-[#E0E1DD]">
                                    <CiEdit className=" text-base fill-light inline mr-1" />
                                    <span className=" align-middle">Edit Profile</span>
                                </Link>
                            </div>
                        </div>
                        {
                            props.user.user_detail && props.user.user_detail.about ? (
                                <div className=" px-4 pb-8 pt-5 rounded-md border border-[#0D1B2A]">
                                    <h2 className=" text-base font-bold tracking-wide mb-1">About {(props.user.user_detail && props.user.user_detail.first_name) ?? props.user.username}</h2>
                                    <p className=" text-xs tracking-wide mb-4">
                                        {props.user.user_detail.about}
                                    </p>
                                </div>
                            ) : null
                        }
                    </section>
                    <section>
                        <div className=" px-4 py-5 rounded-md border border-[#0D1B2A]">
                            <h2 className=" text-lg font-bold tracking-wide mb-2">Connect</h2>
                            <ul className=" flex flex-col gap-3 text-xs tracking-wide">
                                <li className=" flex items-center gap-2">
                                    <CiFacebook className=" text-lg" />
                                    <Link href={(props.user.user_detail && props.user.user_detail.soc_fb) ?? '#'} className=" hover:underline">{(props.user.user_detail && props.user.user_detail.soc_fb) ?? 'N/A'}</Link>
                                </li>
                                <li className=" flex items-center gap-2">
                                    <FaLinkedinIn className=" text-lg" />
                                    <Link href={(props.user.user_detail && props.user.user_detail.soc_linkedin) ?? '#'} className=" hover:underline">{(props.user.user_detail && props.user.user_detail.soc_linkedin) ?? 'N/A'}</Link>
                                </li>
                                <li className=" flex items-center gap-2">
                                    <FaSquareXTwitter className=" text-lg" />
                                    <Link href={(props.user.user_detail && props.user.user_detail.soc_twitter) ?? '#'} className=" hover:underline">{(props.user.user_detail && props.user.user_detail.soc_twitter) ?? 'N/A'}</Link>
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