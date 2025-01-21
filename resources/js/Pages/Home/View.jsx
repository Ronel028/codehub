import { Link } from "@inertiajs/react";
import moment from "moment"
import { LuDot } from "react-icons/lu";
import Tiptap from "../Components/Markdown/Tiptap";
import MainLayout from "../../layout/main"
import imagePlacholder from "../Assets/Img/cypher.jpg"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import 'react-quill/dist/quill.snow.css';
import NoDataFound from "../Components/Nodatafound";
import { diffInDays } from "../../utils/functions";


const ViewBlog = (props) => {

    return (
        <>
            <MainLayout>
                <main className=" max-w-[1000px] mx-auto">
                    <div className=" pt-5 mb-6">
                        <h1 className=" blog__title font-bold tracking-wide">{props.blog.title}</h1>
                    </div>
                    <div className="pt-3 pb-7">
                        <div className=" flex items-center gap-2 mb-5">
                            <div className="w-10 aspect-square rounded-full p-[2px] border border-[#415A77] flex items-center justify-center">
                                <img
                                    src={props.blog.user.avatar?.path ?? imagePlacholder}
                                    alt={props.blog.user.avatar?.filename ?? 'user'}
                                    className=" w-full aspect-square rounded-full cursor-pointer" />
                            </div>
                            <div>
                                <p className=" text-[#E0E1DD] text-sm">
                                    <span>{props.blog.user.user_detail?.full_name ?? props.blog.user.username}</span>
                                </p>
                                <p className=" text-gray-400 text-xs flex items-center">
                                    {diffInDays(props.blog.created_at)}
                                    <LuDot />
                                    {moment(props.blog.created_at).format('ll')}
                                </p>
                            </div>
                        </div>
                        <Tiptap
                            rteValue={props.blog.content}
                            setRteValue={null}
                            disableMenuBar={true}
                            styleContainer="h-auto line-hieght"
                            editable={false}
                        />
                    </div>
                </main>
            </MainLayout>
            <div className=" w-full py-8 h-auto bg-[#0D1B2A]">
                <div className="mb-5 w-[90%] max-w-[1000px] mx-auto">
                    <div className="w-14 h-14 rounded-full p-[2px] mb-3 border border-[#415A77] flex items-center justify-center">
                        <img
                            src={props.blog.user.avatar?.path ?? imagePlacholder}
                            alt={props.blog.user.avatar?.filename ?? 'user'}
                            className=" object-center w-full h-full rounded-full cursor-pointer" />
                    </div>
                    <div className=" mb-5">
                        <p className=" text-[#E0E1DD] text-base font-bold flex items-center gap-1 mb-1">
                            Written by
                            <span>{props.blog.user.user_detail?.full_name ?? props.blog.user.username}</span>
                        </p>
                        <p className=" text-[#778DA9] text-xs flex items-center mb-3">
                            <span className="flex items-center">
                                <span className=" rounded-md text-very-light/80">
                                    {props.blog.user.user_detail?.tagline}
                                </span>
                            </span>
                        </p>
                        <Link href={`/profile/info/${props.blog.user.username}`} className="mt-2 bg-very-light text-primary font-bold px-2 py-1 inline-block rounded-md text-sm">Visit Profile</Link>
                    </div>
                    <div className=" pt-5 mb-6">
                        <h1 className=" text-base font-bold tracking-wide flex items-center gap-1 mb-3">
                            More from
                            <span>{props.blog.user.user_detail?.full_name ?? props.blog.user.username}</span>
                        </h1>
                        {
                            props.more_blogs.length > 0 ? (
                                <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {
                                        props.more_blogs.map(blog => (
                                            <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.id}`}>
                                                <div>
                                                    <div className=" overflow-hidden rounded-t mb-2 border border-[#415A77]">
                                                        <img
                                                            className=" aspect-[4/2] object-cover rounded-t"
                                                            src={(blog.upload && blog.upload.path) ?? imagePlaceholder}
                                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                        />
                                                    </div>
                                                    <div className=" mb-1">
                                                        <p className=" font-bold mb-1 text-xl">{blog.title}</p>
                                                        <p className=" text-xs">
                                                            {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className=" font-normal mb-1 text-gray-400 text-sm">{blog.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : (
                                <NoDataFound content="No more post." />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBlog