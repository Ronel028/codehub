import moment from "moment"
import "highlight.js/styles/default.min.css"
import ReactQuill from "react-quill";
import { LuDot } from "react-icons/lu";
import MainLayout from "../../layout/main"
import imagePlacholder from "../Assets/Img/image-placeholder.webp"
import 'react-quill/dist/quill.snow.css';

const ViewBlog = (props) => {

    return (
        <>
            <MainLayout>
                <main className=" max-w-[1000px] mx-auto">
                    <div className=" pt-5 mb-6">
                        <h1 className=" text-5xl font-bold tracking-wide">{props.blog.title}</h1>
                    </div>
                    <div>
                        <div className=" flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 rounded-full p-[2px] border flex items-center justify-center">
                                <img
                                    src={(props.blog.user.upload && `/storage/${props.blog.user.upload.path}`) ?? imagePlacholder}
                                    alt={(props.blog.user.upload && props.blog.user.upload.filename) ?? 'user'}
                                    className="relative inline-block object-cover object-center w-full h-full rounded-full cursor-pointer" />
                            </div>
                            <div>
                                <p className=" text-secondary text-sm">{props.blog.user.full_name ?? "N/A"} | {props.blog.user.username}</p>
                                <p className=" text-gray-400 text-xs flex items-center">
                                    {moment(props.blog.created_at).startOf('hour').fromNow()}
                                    <LuDot />
                                    {moment(props.blog.created_at).format('ll')}
                                </p>
                            </div>
                        </div>
                            <div className=" mb-2">
                                <ReactQuill 
                                    modules={{
                                        syntax: true,
                                        toolbar: false
                                    }}
                                    value={props.blog.content}
                                    id="style-editor"
                                    className="view-style"
                                    readOnly={true}
                                    theme={"bubble"}
                                />
                            </div>
                    </div>
                </main>
            </MainLayout>
        </>
    )
}

export default ViewBlog