import { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input";
import RteEditor from "../Components/Markdown/Rte";
import Tiptap from "../Components/Markdown/Tiptap";
import Select from "../Components/Forms/Select";
import Button from "../Components/Forms/Button";

const EditBlog = (props) => {

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState((props.blog.upload && props.blog.upload.path) ?? null)
    const { data, setData, post, errors, progress, reset } = useForm({
        id: props.blog.id,
        title: props.blog.title,
        description: props.blog.description,
        category: props.blog.category_reference_id,
        content: props.blog.content,
        is_publish: props.blog.is_published,
        image: null,
    })

    // SAVE UPDATED DATA TO THE DATABASE
    const store = (e) => {
        e.preventDefault()
        post(`/blog/save-edit`, {
            onSuccess: () => {
                toast.success('blog successfully updated!')
            },
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
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

    return (
        <>
            <MainLayout>
                <div className=" mb-8 py-4 border-b">
                    <h1 className=" text-xl font-bold">Update Blog</h1>
                </div>
                <div className="pb-8">
                    <form>
                        <div className=" grid grid-cols-[70%_27%] gap-[3%] mb-4">
                            <div>
                                <Input error={errors.title} type="text" label="Title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Create your unique title of your blog here..." className="mb-5" />
                                <Input error={errors.description} type="text" label="Description" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Add description of your blog here..." className="mb-5" />
                                <div className=" flex items-center justify-start gap-6">
                                    <div className="">
                                        <Select error={errors.category} data={props.category} value={data.category} onChange={e => setData('category', e.target.value)} className="w-full" />
                                    </div>
                                    <div className=" flex items-center gap-2">
                                        <label htmlFor="is_publish" className=" text-sm">Make this public</label>
                                        <input type="checkbox" id="is_publish" checked={data.is_publish} onChange={e => setData('is_publish', e.target.checked)} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={`${errors.image ? 'border-red-500 p-1' : 'border-[#415A77] bg-[#0D1B2A] '} w-full h-[200px] p-2  flex border-dashed border-2  rounded-md items-center mx-auto text-center cursor-pointer`}>
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
                            </div>
                        </div>
                        <div className=" mb-2">
                            <Tiptap error={errors.content} rteValue={data.content} setRteValue={setData} />
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Link href="/" className=" border border-[#415A77] hover:bg-[#415A77] transition-colors ease-linear duration-150 rounded-md text-xs px-3 py-2 text-[#E0E1DD]">Back</Link>
                            <Button event={store} loading={loading}>Save</Button>
                        </div>
                    </form>
                </div>
            </MainLayout>
        </>
    )
}

export default EditBlog