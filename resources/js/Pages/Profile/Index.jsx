import { useState } from "react";
import { Link } from "@inertiajs/react";
import { isNull } from "lodash";
import ProfileLayout from "../../layout/profileLayout";
import ProfilePictureModal from "../Components/Modals/ProfilePictureModal";
import BlogPostCard from "../Components/BlogPostCard";
import { FaLinkedinIn, FaFacebook, FaUserEdit } from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter, FaCameraRotate } from "react-icons/fa6";
import altImage from "../Assets/Img/cypher.jpg"
import { toast } from "react-toastify";

const Profile = (props) => {

    const [profilePhoto, setProfilePhoto] = useState(null)

    const handleChangePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.size > 1000000) {
                toast.error('File size exceed the maximum limit for 1mb, Please try upload another image.', {
                    position: 'top-right'
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
                            <img className=" h-full w-full object-cover" src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className=" -mt-24 flex items-center justify-start max-w-[1500px] w-[90%] mx-auto ">
                                <div className=" relative overflow-hidden rounded-full group">
                                    <img
                                        className="h-full w-36 aspect-square object-cover rounded-full"
                                        src={(props.user.upload && props.user.upload.path) ?? altImage}
                                        alt={(props.user.upload && props.user.upload.filename) ?? "image-placeholder"}
                                    />
                                    <div className=" bg-primary bg-opacity-70 absolute left-0 right-0 bottom-0 h-10 hidden group-hover:flex items-center justify-center">
                                        <label htmlFor="profile__Photo" className="cursor-pointer">
                                            <FaCameraRotate className="text-xl hover:text-red-400 transition-colors ease-linear duration-150" />
                                        </label>
                                        <input onChange={handleChangePhoto} type="file" id="profile__Photo" hidden />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" max-w-[1500px] w-[90%] mx-auto pb-8 pt-14  mb-4 ">
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
                                    <Link title="Edit Profile" href="/profile/edit" className=" border border-[#415A77] hover:border-red-400 hover:bg-red-400 transition-colors ease-linear duration-150 rounded-md text-xs px-2 py-2 text-[#E0E1DD]">
                                        <FaUserEdit className=" text-base text-light inline" />
                                    </Link>
                                </div>
                            </div>
                            {
                                props.user.user_detail && props.user.user_detail.about ? (
                                    <div className=" mt-8">
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
                    <section className="max-w-[1500px] w-[90%] mx-auto">
                        {
                            props.blogs.length > 0 ? (
                                <>
                                    <p className="inline-block bg-red-400 text-xs font-bold me-2 px-2.5 py-1 mb-2 rounded-full transition-colors ease-linear duration-150 ">Blogs</p>
                                    <div className=" grid grid-cols-3 gap-2">
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