import { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { isEmpty, isNull } from "lodash";
import MainLayout from "../../layout/main"
import BlogPostModal from "../Components/BlogPostModal"
import { IoMdSync } from "react-icons/io";
import { BsCloudCheck } from "react-icons/bs";

import TiptopRte from "../Components/Markdown/TiptopRte";

const CreateBlog = ({ blog }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [disableCheck, setDisableCheck] = useState(false)
    const [image, setImage] = useState(null)
    const { data, setData, post, processing } = useForm({
        content: blog !== null ? blog.content : null,
        is_publish: blog !== null ? blog.is_published : false
    })

    // SAVE DATA TO THE DATABASE
    const store = (e) => {
        const queryParams = new URLSearchParams(window.location.search)
        const postId = queryParams.get('id');
        post(`/blog/store?post_id=${postId}`, {
            onError: error => {
                toast.error(error.message)
            }
        })
    }

    // HANDLE IMAGE PREVIEW
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setData('image', event.target.files[0])
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        if (!isNull(queryParams.get('id'))) {
            store()
        }
    }, [data])

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        if (isNull(queryParams.get('id'))) {
            setIsModalOpen(prevState => true)
        } else {
            setIsModalOpen(prevState => false)
        }
    }, [isModalOpen])

    useEffect(() => {
        if (isNull(data.content) || isEmpty(data.content)) {
            setDisableCheck(prevState => true)
        } else {
            setDisableCheck(prevState => false)
        }
    }, [data.content])

    return (
        <>
            {isModalOpen ? <BlogPostModal setIsModalOpen={setIsModalOpen} /> : null}
            <MainLayout>
                <div className=" mb-8 py-2 border-b border-primary flex items-center justify-between">
                    {/* <h1 className=" text-lg font-bold">Start Sharing Your Code and Knowledge Today.</h1> */}
                    <div className="flex items-center gap-5">
                        {
                            isNull(blog) ? null : (
                                <>
                                    <h1 className=" text-3xl font-bold">{blog.title}</h1>
                                    {
                                        processing ? (
                                            <p className=" text-yellow-400 font-bold ">
                                                <IoMdSync className=" text-sm inline-block mr-1" />
                                                <span className="text-xs inline-block">Saving...</span>
                                            </p>
                                        ) : (
                                            <p className="text-green-400 font-bold ">
                                                <BsCloudCheck className=" text-sm inline-block mr-1" />
                                                <span className="text-xs inline-block">Saved</span>
                                            </p>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className=" flex items-center gap-2">
                        <label htmlFor="is_publish" className=" text-xs cursor-pointer">Make this visible to everyone</label>
                        <input disabled={disableCheck} type="checkbox" id="is_publish" checked={data.is_publish} onChange={(e) => setData('is_publish', e.target.checked)} className="text-xs text-red-400 bg-gray-100" />
                    </div>
                </div>
                <div className="pb-8">
                    <form>
                        {/* <div className=" grid grid-cols-[70%_27%] gap-[3%] mb-4">
                            <div className=" flex items-center justify-start gap-6">
                                <div className=" flex items-center gap-2">
                                    <label htmlFor="is_publish" className=" text-xs cursor-pointer">Make this visible to everyone</label>
                                    <input disabled={disableCheck} type="checkbox" id="is_publish" checked={data.is_publish} onChange={(e) => setData('is_publish', e.target.checked)} className="text-xs text-red-400 bg-gray-100" />
                                </div>
                            </div>
                        </div> */}
                        <div className=" mb-2">
                            {/* <Tiptap error={errors.content} rteValue={data.content} setRteValue={setData} /> */}
                            <TiptopRte data={data} setData={setData} />
                        </div>
                    </form>
                </div>
            </MainLayout>
        </>
    )
}

export default CreateBlog