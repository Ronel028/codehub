import { Link } from "@inertiajs/react";
import ProfileLayout from "../../layout/profileLayout";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter, FaCircleInfo } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import altImage from "../Assets/Img/cypher.jpg"

const Profile = (props) => {

    console.log(props);

    return (
        <>
            <ProfileLayout>
                <main className="">
                    <section>
                        <div className=" h-56 w-full  rounded-t-md">
                            <img className=" h-full w-full object-cover" src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className=" -mt-24 flex items-center justify-start max-w-[1500px] w-[90%] mx-auto ">
                                <img
                                    className="h-full w-36 aspect-square object-cover rounded-full"
                                    src={(props.user.upload && props.user.upload.path) ?? altImage}
                                    alt={(props.user.upload && props.user.upload.filename) ?? "image-placeholder"}
                                />
                            </div>
                        </div>
                        <div className=" max-w-[1500px] w-[90%] mx-auto px-4 pb-8 pt-14  mb-4 ">
                            <div className="flex items-start justify-between">
                                <div className=" flex gap-2 items-start">
                                    <div className="">
                                        <h2 className=" text-4xl font-bold tracking-wide mb-1">{(props.user.user_detail && props.user.full_name) ?? props.user.username}</h2>
                                        <div className=" flex items-center gap-5 mb-5">
                                            {
                                                props.user.user_detail && props.user.user_detail.address ? (
                                                    <p className=" text-xs font-bold tracking-wide flex gap-1">
                                                        <FaLocationDot />
                                                        {props.user.user_detail.address}
                                                    </p>
                                                ) : null
                                            }
                                            <div className=" flex gap-5 tracking-wide">
                                                {
                                                    props.user.user_detail && props.user.user_detail.soc_fb ? (
                                                        <Link href={props.user.user_detail.soc_fb ?? '#'} className="font-bold flex gap-1 text-xs hover:underline">
                                                            <FaFacebook className=" text-blue-400" />
                                                            Facebook
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    props.user.user_detail && props.user.user_detail.soc_linkedin ? (
                                                        <Link href={props.user.user_detail.soc_linkedin ?? '#'} className="font-bold flex gap-1 text-xs hover:underline">
                                                            <FaLinkedinIn className=" text-blue-600" />
                                                            Linkedin
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    props.user.user_detail && props.user.user_detail.soc_twitter ? (
                                                        <Link href={props.user.user_detail.soc_twitter ?? '#'} className="font-bold flex gap-1 text-xs hover:underline">
                                                            <FaSquareXTwitter className=" text-light" />
                                                            Twitter
                                                        </Link>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                props.user.user_detail &&
                                                    props.user.user_detail.experiences !== null ? props.user.user_detail.experiences.map((experience, index) => (
                                                        <span key={index} className="border border-red-400 hover:bg-[#415A77] text-red-400 text-xs font-bold me-2 px-2.5 py-2 rounded-full transition-colors ease-linear duration-150 ">{experience}</span>
                                                    )) : null
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
                                    <div className=" pb-8 mt-8">
                                        <h2 className=" text-base font-bold tracking-wide mb-1 text-yellow-400 uppercase">
                                            About {(props.user.user_detail && props.user.user_detail.first_name) ?? props.user.username}
                                        </h2>
                                        <p className=" text-xs tracking-wide mb-4">
                                            {props.user.user_detail.about}
                                        </p>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section>
                </main>
            </ProfileLayout>
        </>
    )
}

export default Profile;