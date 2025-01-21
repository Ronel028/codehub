import { useState } from "react";
import { Link } from "@inertiajs/react";
import { capitalize, isNull } from "lodash";
import ProfileLayout from "../../layout/profileLayout";
import ProfilePictureModal from "../Components/Modals/ProfilePictureModal";
import BlogPostCard from "../Components/BlogPostCard";
import { FaLinkedinIn, FaFacebook, FaUserEdit, FaFacebookF, FaGithub } from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter, FaCameraRotate } from "react-icons/fa6";
import altImage from "../Assets/Img/cypher.jpg"
import { toast } from "react-toastify";

const socialMediaIcons = {
  facebook: <FaFacebookF className=' text-xs text-blue-400' />,
  linkedin: <FaLinkedinIn className=' text-xs text-blue-600' />,
  twitter: <FaSquareXTwitter className=' text-xs text-light' />,
  github: <FaGithub className=' text-xs text-gray-300' />,
}

const Profile = (props) => {
    console.log(props)
    const [profilePhoto, setProfilePhoto] = useState(null)

    const handleChangePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.size > 1000000) {
                toast.error('File size exceed the maximum limit for 1mb, Please try upload another image.', {
                    position: 'top-right',
                    autoClose: 10000,
                })
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfilePhoto(prevState => e.target.result)
            }
            reader.readAsDataURL(image)
            e.target.value = ''
        }
    }

    return (
        <>
            <ProfileLayout>
                {
                    !isNull(profilePhoto) ? (
                        <ProfilePictureModal photo={profilePhoto} setPhoto={setProfilePhoto} />
                    ) : null
                }
                <main className="">
                    <section>
                        <div className=" h-56 w-full  rounded-t-md">
                            <img className=" w-full aspect-[4/1]" src={props.user.cover?.path ?? null} alt="" />
                            <div className=" -mt-24 flex items-center justify-start max-w-[1500px] w-[90%] mx-auto ">
                                <div className=" relative overflow-hidden rounded-full">
                                    <img
                                        className="h-full w-36 aspect-square rounded-full border-2 border-[#1b263b]"
                                        src={props.user.avatar?.path ?? altImage}
                                        alt={(props.user.upload && props.user.upload.filename) ?? "image-placeholder"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" max-w-[1500px] w-[90%] mx-auto pb-8 mt-44  mb-4 ">
                            <div className="flex items-start justify-between">
                                <div className=" flex gap-2 items-start">
                                    <div className="">
                                        <h2 className=" text-4xl font-bold tracking-wide mb-1">{props.user.user_detail?.full_name ?? props.user.username}</h2>
                                        {
                                            !isNull(props.user.user_details) ? (
                                                <div className=" flex flex-wrap gap-5 tracking-wide mb-5">
                                                    <p className=" text-sm font-light tracking-wide flex gap-1">
                                                        {props.user.user_detail.tagline}
                                                    </p>
                                                </div>
                                            ) : null
                                        }
                                        <div className=" flex items-center flex-wrap gap-5">
                                            {/* {
                                                props.user.user_detail && props.user.user_detail.address ? (
                                                    <p className=" text-xs font-bold tracking-wide flex gap-1">
                                                        <FaLocationDot />
                                                        {props.user.user_detail.address}
                                                    </p>
                                                ) : null
                                            } */}
                                            <div className=" flex flex-wrap gap-5 tracking-wide">
                                                {
                                                    props.user.social_media_links.length > 0 ? (
                                                        props.user.social_media_links.map(value => (
                                                            <Link key={value.id} href={props.user.user_detail.soc_fb ?? '#'} className="font-bold flex items-center gap-1 text-xs hover:underline">
                                                                { socialMediaIcons[value.platform] }
                                                                {capitalize(value.platform)}
                                                            </Link>
                                                        ))
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                !isNull(props.user.user_detail?.bio) ? (
                                    <div className=" mt-8">
                                        <h2 className=" text-base font-bold tracking-wide mb-1 text-yellow-400 capitalize">
                                            Professional Bio
                                        </h2>
                                        <p className=" text-xs tracking-wide mb-4">
                                            {props.user.user_detail.bio}
                                        </p>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section>
                    <section className="max-w-[1500px] w-[90%] mx-auto">
                        {
                            props.blogs.length > 0 ? (
                                <>
                                    <p className="inline-block bg-red-400 text-xs font-bold me-2 px-2.5 py-1 mb-2 rounded-full transition-colors ease-linear duration-150 ">Blogs</p>
                                    <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                                        {
                                            props.blogs.map(blog => (
                                                <BlogPostCard
                                                    key={blog.id}
                                                    blogId={blog.id}
                                                    username={blog.user.username}
                                                    title={blog.title}
                                                    description={blog.description}
                                                    createdAt={blog.created_at}
                                                    blogPhoto={blog.upload}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            ) : null
                        }
                    </section>
                </main>
            </ProfileLayout>
        </>
    )
}

export default Profile;