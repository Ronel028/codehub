import { Link } from "@inertiajs/react";
import moment from "moment"
import { LuDot } from "react-icons/lu";
import Tiptap from "../Components/Markdown/Tiptap";
import MainLayout from "../../layout/main"
import BlogPostCard from "../Components/BlogPostCard";
import { diffInDays } from "../../utils/functions";
import 'react-quill/dist/quill.snow.css';
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import imagePlacholder from "../Assets/Img/cypher.jpg"

const socialMediaIcons = {
  facebook: <FaFacebookF className=' text-blue-400 text-xl' />,
  linkedin: <FaLinkedinIn className=' text-blue-600 text-xl' />,
  twitter: <FaSquareXTwitter className=' text-dark-gray text-xl' />,
  github: <FaGithub className=' text-gray-500 text-xl' />,
}

const ViewBlog = (props) => {
    const { blog, more_blogs } = props
    return (
        <>
            <MainLayout>
                <main className=" max-w-[1000px] mx-auto">
                    <div className=" pt-5 mb-6">
                        <h1 className=" blog__title text-dark-gray font-bold tracking-wide mb-2">{blog.title}</h1>
                        <p className=" text-dark-gray tracking-wide">{blog.description}</p>
                    </div>
                    <div className="pt-3 pb-7">
                        <div className="mb-5 pb-4 flex items-center justify-between gap-2 border-b border-gray-light">
                            <div className=" flex items-center gap-2">
                                <div className="w-10 aspect-square rounded-full p-[2px] border border-gray-light flex items-center justify-center">
                                    <img
                                        src={blog.user.avatar?.path ?? imagePlacholder}
                                        alt={blog.user.avatar?.filename ?? 'user'}
                                        className=" w-full aspect-square rounded-full cursor-pointer" />
                                </div>
                                <div>
                                    <Link href={`/profile/info/${blog.user.username}`} className="hover:underline text-dark-gray font-semibold text-sm">
                                        <span>{blog.user.user_detail?.full_name ?? blog.user.username}</span>
                                    </Link>
                                    <p className=" text-meduim-gray text-xs flex items-center">
                                        {diffInDays(blog.created_at)}
                                        <LuDot />
                                        {moment(blog.created_at).format('ll')}
                                    </p>
                                </div>
                            </div>
                            <div className=" flex items-center gap-3">
                                {
                                    blog.user.social_media_links.map(value => (
                                        <a key={value.id} href={value.link} target="_blank">
                                            {socialMediaIcons[value.platform]}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-5">
                            <img src={blog.upload?.path} alt={blog.upload.filename} className=" rounded-md w-full" />
                        </div>
                        <Tiptap
                            rteValue={blog.content}
                            setRteValue={null}
                            disableMenuBar={true}
                            styleContainer="h-auto line-hieght"
                            editable={false}
                        />
                    </div>
                </main>
            </MainLayout>
            <div className=" w-full py-8 h-auto bg-soft-light border-t border-gray-light">
                <div className="mb-5 w-[90%] max-w-[1000px] mx-auto flex items-start gap-3">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full p-[2px] mb-3 border border-gray-light flex items-center justify-center">
                        <img
                            src={blog.user.avatar?.path ?? imagePlacholder}
                            alt={blog.user.avatar?.filename ?? 'user'}
                            className=" object-center w-full h-full rounded-full cursor-pointer" />
                    </div>
                    <div className=" mb-5">
                        <p className=" text-dark-gray text-lg font-bold flex items-center gap-1">
                            Written by
                            <span>{blog.user.user_detail?.full_name ?? blog.user.username}</span>
                        </p>
                        <p className=" text-meduim-gray text-xs flex items-center">
                            <span className="flex items-center">
                                <span className=" rounded-md">
                                    {blog.user.user_detail?.tagline}
                                </span>
                            </span>
                        </p>
                        <p className=" text-meduim-gray text-sm flex items-center mt-2">
                            <span className="flex items-center">
                                <span className=" rounded-md">
                                    {blog.user.user_detail?.bio}
                                </span>
                            </span>
                        </p>
                        {/* <Link href={`/profile/info/${blog.user.username}`} className="mt-2 bg-very-light text-primary font-bold px-2 py-1 inline-block rounded-md text-sm">Visit Profile</Link> */}
                    </div>
                </div>
                {
                    more_blogs.length > 0 ? (
                        <div className=" pt-5 mb-6 w-[90%] max-w-[1000px] mx-auto">
                            <h1 className=" text-xl font-bold tracking-wide flex items-center gap-1 mb-3">
                                More from
                                <span>{blog.user.user_detail?.full_name ?? blog.user.username}</span>
                            </h1>
                            {
                                <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {
                                        more_blogs.map(blog => (
                                            // <div key={blog.id} >
                                            //     <div>
                                            //         <div className=" overflow-hidden rounded-t mb-2 border border-gray-light">
                                            //             <img
                                            //                 className=" aspect-[4/2] object-cover rounded-t"
                                            //                 src={(blog.upload && blog.upload.path) ?? imagePlaceholder}
                                            //                 alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                            //             />
                                            //         </div>
                                            //         <div className=" mb-1">
                                            //             <Link href={`/blog-list/read/${blog.user.username}/${blog.id}`} className="font-bold text-xl text-dark-gray hover:underline">{blog.title}</Link>
                                            //             <p className=" text-xs text-meduim-gray">
                                            //                 {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                            //             </p>
                                            //         </div>
                                            //         <div>
                                            //             <p className=" font-normal mb-1 text-dark-gray text-sm">{limitStr(blog.description, 100)}</p>
                                            //         </div>
                                            //     </div>
                                            // </div>
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
                            }
                        </div>
                    ) : null
                }

            </div>
        </>
    )
}

export default ViewBlog