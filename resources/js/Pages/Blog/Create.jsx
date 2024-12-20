import { useState, useEffect, useRef, useMemo } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { debounce, isEmpty, isNull } from "lodash";
import { MdOutlineFileUpload } from "react-icons/md";
import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input";
import RteEditor from "../Components/Markdown/Rte";
import Select from "../Components/Forms/Select";
import Button from "../Components/Forms/Button";
import BlogPostModal from "../Components/BlogPostModal"

import Tiptap from "../Components/Markdown/Tiptap";
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
        console.log(data.content)
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
                <p>{processing ? 'Saving...' : null}</p>
                <div className=" mb-8 py-4 border-b border-light-gray">
                    <h1 className=" text-xl font-bold">Start Sharing Your Code and Knowledge Today.</h1>
                </div>
                <div className="pb-8">
                    <form>
                        <div className=" grid grid-cols-[70%_27%] gap-[3%] mb-4">
                            {/* <div>
                                <Input error={errors.title} type="text" label="Title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Create your unique title of your blog here..." className="mb-5" />
                                <Input error={errors.description} type="text" label="Description" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description here..." className="mb-5" />
                                <div className=" flex items-center justify-start gap-6">
                                    <div className=" flex items-center gap-2">
                                        <label htmlFor="is_publish" className=" text-sm cursor-pointer">Make this visible to everyone</label>
                                        <input type="checkbox" id="is_publish" checked={data.is_publish} onChange={e => setData('is_publish', e.target.checked)} />
                                    </div>
                                </div>
                            </div> */}
                            {/* <div>
                                <div className={`${errors.image ? 'border-red-500 p-1' : 'border-[#415A77] bg-[#0D1B2A] '} w-full h-[200px] p-2  flex  border-dashed border-2  rounded-md items-center mx-auto text-center cursor-pointer`}>
                                    <input id="upload" type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                                    <label htmlFor="upload" className="cursor-pointer w-full h-[200px] py-2 flex items-center justify-center">
                                        {
                                            image === null ? <div>
                                                <div className=" flex items-center justify-center">
                                                    <MdOutlineFileUpload className=" text-4xl" />
                                                </div>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-[#E0E1DD]">Upload picture</h5>
                                                <p className="font-normal text-sm text-[#778DA9] md:px-6">Choose photo size should be less than <b className="text-[#E0E1DD]">8mb</b></p>
                                                <p className="font-normal text-sm text-[#778DA9] md:px-6">and should be in <b className="text-[#E0E1DD]">JPG, PNG, or WEBP</b> format.</p>
                                                <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                            </div> : <img className=" w-full h-full object-cover rounded-md" src={image} alt="" />
                                        }
                                    </label>
                                </div>
                                {errors.image && <p className=" text-xs text-red-500">{errors.image}</p>}
                            </div> */}
                            <div className=" flex items-center justify-start gap-6">
                                <div className=" flex items-center gap-2">
                                    <label htmlFor="is_publish" className=" text-sm cursor-pointer">Make this visible to everyone</label>
                                    <input disabled={disableCheck} type="checkbox" id="is_publish" checked={data.is_publish} onChange={(e) => setData('is_publish', e.target.checked)} />
                                </div>
                            </div>
                        </div>
                        <div className=" mb-2">
                            {/* <Tiptap error={errors.content} rteValue={data.content} setRteValue={setData} /> */}
                            <TiptopRte data={data} setData={setData} />
                            {/* <RteEditor setRteValue={setData} rteValue={data.content} error={errors.content} /> */}
                        </div>
                        {/* <div className=" flex items-center justify-end gap-2">
                            <Link href="/" className=" border border-[#415A77] hover:bg-[#415A77] transition-colors ease-linear duration-150 rounded-md text-xs px-3 py-2 text-[#E0E1DD]">Back</Link>
                            <Button event={store} loading={loading}>Save</Button>
                        </div> */}
                    </form>
                </div>
            </MainLayout>
        </>
    )
}

export default CreateBlog