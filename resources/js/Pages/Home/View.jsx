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
                                    src={(props.blog.user.upload && props.blog.user.upload.path) ?? imagePlacholder}
                                    alt={(props.blog.user.upload && props.blog.user.upload.filename) ?? 'user'}
                                    className=" w-full aspect-square rounded-full cursor-pointer" />
                            </div>
                            <div>
                                <p className=" text-[#E0E1DD] text-sm">
                                    {
                                        props.blog.user.full_name != ' ' && props.blog.user.full_name != null ? (
                                            <span>{props.blog.user.full_name + ' | ' + props.blog.user.username}</span>
                                        ) : <span>{props.blog.user.username}</span>
                                    }
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
                            src={(props.blog.user.upload && props.blog.user.upload.path) ?? imagePlacholder}
                            alt={(props.blog.user.upload && props.blog.user.upload.filename) ?? 'user'}
                            className=" object-center w-full h-full rounded-full cursor-pointer" />
                    </div>
                    <div className=" mb-5">
                        <p className=" text-[#E0E1DD] text-base font-bold flex items-center gap-1 mb-1">
                            Written by
                            {
                                props.blog.user.full_name != ' ' && props.blog.user.full_name != null ? (
                                    <span>{props.blog.user.full_name + ' | ' + props.blog.user.username}</span>
                                ) : <span>{props.blog.user.username}</span>
                            }
                        </p>
                        <p className=" text-[#778DA9] text-xs flex items-center mb-3">
                            {
                                props.blog.user.user_detail && props.blog.user.user_detail.experiences !== null ? (
                                    props.blog.user.user_detail.experiences.map((experience, index) => (
                                        <span key={index} className="flex items-center">
                                            <span className="  bg-[#415A77] py-1 px-2 rounded-md">
                                                {experience}
                                            </span>
                                            {index !== props.blog.user.user_detail.experiences.length - 1 && <LuDot className=" text-base" />}
                                        </span>
                                    ))
                                ) : null
                            }
                        </p>
                        <p className=" text-sm tracking-wide">
                            {props.blog.user.user_detail && props.blog.user.user_detail.about}
                        </p>
                    </div>
                    <div className=" pt-5 mb-6">
                        <h1 className=" text-base font-bold tracking-wide flex items-center gap-1 mb-3">
                            More from
                            {
                                props.blog.user.full_name != ' ' && props.blog.user.full_name != null ? (
                                    <span>{props.blog.user.full_name + ' | ' + props.blog.user.username}</span>
                                ) : <span>{props.blog.user.username}</span>
                            }
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