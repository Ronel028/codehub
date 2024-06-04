import { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input";
import RteEditor from "../Components/Markdown/Rte";

const CreateBlog = () => {

    const [image, setImage] = useState(null)
    const { data, setData, post, errors, progress, reset } = useForm({
        title: '',
        description: '',
        content: null,
        image: null,
    })
      
    // SAVE DATA TO THE DATABASE
    const store = (e) => {
        e.preventDefault()
        post(`/blog/store/${e.target.name}`, {
            onSuccess: () => {
                reset('title', 'description', 'image')
                setImage(null)
                if(e.target.name === 'publish'){
                    toast.success('New blog successfully uploaded!')
                }else{
                    toast.success('Blog save successfully to draft!')
                }
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
                    <h1 className=" text-xl font-bold">Get Started on Your New Blog Today📒</h1>  
                </div>
                <div className="pb-8">
                    <form>
                        <div className=" grid grid-cols-[70%_27%] gap-[3%]">
                            <div>
                                <Input error={errors.title} type="text" label="Title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Create your unique title of your blog here..." className="mb-5" />
                                <Input error={errors.description} type="text" label="Description" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Add description of your blog here..." className="mb-5" />
                            </div>
                            <div className="mb-4">
                                <div className={`${errors.image ? 'border-red-500 p-1' : 'border-secondary'} w-full h-[200px] p-2  flex bg-gray-100 border-dashed border-2  rounded-md items-center mx-auto text-center cursor-pointer`}>
                                    <input id="upload" type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                                    <label htmlFor="upload" className="cursor-pointer w-full h-[200px] py-2 flex items-center justify-center">
                                    {
                                        image === null ? <div>
                                                <div className=" flex items-center justify-center">
                                                    <MdOutlineFileUpload className=" text-4xl" />
                                                </div>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-primary">8mb</b></p>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-primary">JPG, PNG, or WEBP</b> format.</p>
                                                <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                            </div> : <img className=" w-full h-full object-cover rounded-md" src={image} alt="" />
                                    }
                                    </label>
                                </div>
                                {errors.image && <p className=" text-xs text-red-500">{errors.image}</p>}
                            </div>
                        </div>
                        <div className=" mb-2">
                            <RteEditor setRteValue={setData} rteValue={data.content} error={errors.content} />
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Link href="/" className=" font-bold border border-secondary  py-2 text-sm rounded px-3 text-primary tracking-wide">Back</Link>
                            <button type="button" onClick={store} name="draft" className=" font-bold bg-secondary  py-2 text-sm rounded px-3 text-light tracking-wide">Save to Draft</button>
                            <button type="button" onClick={store} name="publish" className=" font-bold bg-indigo-700 py-2 text-sm rounded px-3 text-light tracking-wide">Publish</button>
                        </div>
                    </form>
                </div>  
            </MainLayout> 
        </>
    )  
}

export default CreateBlog