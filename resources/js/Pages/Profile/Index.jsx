import { useState } from "react";
import { Link } from "@inertiajs/react";
import { capitalize, isNull } from "lodash";
import { toast } from "react-toastify";
import ProfileLayout from "../../layout/profileLayout";
import ProfilePictureModal from "../Components/Modals/ProfilePictureModal";
import BlogPostCard from "../Components/BlogPostCard";
import { FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";
import {FaSquareXTwitter } from "react-icons/fa6";
import altImage from "../Assets/Img/cypher.jpg"
import coverPlaceholder from "../../assets/img/cover-placeholder.jpg"

const socialMediaIcons = {
  facebook: <FaFacebookF className=' text-blue-400' />,
  linkedin: <FaLinkedinIn className=' text-blue-600' />,
  twitter: <FaSquareXTwitter className=' text-dark-gray' />,
  github: <FaGithub className=' text-gray-500' />,
}

const Profile = (props) => {
    const { user, blogs } = props
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
                            <img className=" w-full aspect-[4/1]" src={user.cover?.path ?? coverPlaceholder} alt={user.cover?.filename ?? null} />
                            <div className=" -mt-24 flex items-center justify-start max-w-[1500px] w-[90%] mx-auto ">
                                <div className=" relative overflow-hidden rounded-full">
                                    <img
                                        className="h-full w-36 aspect-square rounded-full border-2 border-soft-light"
                                        src={user.avatar?.path ?? altImage}
                                        alt={user.user_detail?.full_name  ?? user.username}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" max-w-[1500px] w-[90%] mx-auto pb-8 mt-44  mb-4 ">
                            <div className="flex items-start justify-between">
                                <div className=" flex gap-2 items-start">
                                    <div className="">
                                        <h2 className=" text-4xl font-bold tracking-wide mb-1">{user.user_detail?.full_name ?? user.username}</h2>
                                        {
                                            !isNull(user.user_detail) ? (
                                                <div className=" flex flex-wrap gap-5 tracking-wide">
                                                    <p className=" text-sm font-light tracking-wide flex gap-1">
                                                        {user.user_detail.tagline}
                                                    </p>
                                                </div>
                                            ) : null
                                        }
                                        <div className=" flex items-center flex-wrap gap-5 mt-4">
                                            <div className=" flex flex-wrap gap-5 tracking-wide">
                                                {
                                                    user.social_media_links.length > 0 ? (
                                                        user.social_media_links.map(value => (
                                                            <Link key={value.id} href={value.link} className="font-bold flex items-center gap-1 text-sm hover:underline">
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
                                !isNull(user.user_detail) ? (
                                    <div className=" mt-8">
                                        <h2 className=" text-lg font-bold tracking-wide mb-1 text-[#0073E6] capitalize">
                                            Professional Bio
                                        </h2>
                                        <p className=" text-sm tracking-wide mb-4">
                                            {user.user_detail.bio}
                                        </p>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section>
                    <section className="max-w-[1500px] w-[90%] mx-auto">
                        {
                            blogs.length > 0 ? (
                                <>
                                    <p className="inline-block bg-red-400 text-xs font-bold me-2 px-2.5 py-1 mb-2 rounded-full transition-colors ease-linear duration-150 ">Blogs</p>
                                    <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                                        {
                                            blogs.map(blog => (
                                                <BlogPostCard
                                                    key={blog.id}
                                                    blogId={blog.id}
                                                    slug={blog.slug}
                                                    username={blog.user.username}
                                                    fullName={blog.user?.user_detail?.full_name}
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