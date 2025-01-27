import { useContext, useEffect, useState } from "react"
import { isNull } from "lodash"
import { PostTitleCreationContext } from "../../../context/PostCreationContext"
import Button from "../../Forms/Button"
import Input from "../../Forms/Input"
import TextArea from "../../Forms/TextArea"
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5"
import { FaRegImages } from "react-icons/fa"
import { FiUploadCloud } from "react-icons/fi";

const PostTitleModal = ({ openModal, close }) => {
    
    const { data, errors, handleOnchage, handleOnChangeThumbnail, save, processing, isModalOpen, closeModal } = useContext(PostTitleCreationContext);
    const [imagePreview, setImagePreview] = useState(null)
    const queryParams = new URLSearchParams(window.location.search)
    const createPost = queryParams.get('create');
    
    useEffect(() => {
        if (!isNull(data.thumbnail)) {
            const reader = new FileReader();

            reader.onloadend = () => {
            setImagePreview(reader.result);
            };

            reader.onerror = () => {
            console.error("File reading failed.");
            };

            reader.readAsDataURL(data.thumbnail);

            return () => {
            reader.abort();
            };
        }
    }, [data.thumbnail]);

    return (
        <div className={`${isModalOpen || !isNull(createPost) ? 'block' : 'hidden'} relative z-50`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form
                        onSubmit={save}
                        className="relative transform overflow-hidden rounded-lg bg-soft-light text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
                    >
                        <div className="bg-soft-light px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3
                                        className="text-base font-semibold text-gray-900"
                                        id="modal-title"
                                    >
                                        Create Post
                                    </h3>
                                    <div className="mt-4">
                                        <Input onChange={handleOnchage} value={data.title} error={errors.title} label="Title" name="title" id="title" placeholder="Type the title of your blog post" className="mb-4" />
                                        <TextArea onChange={handleOnchage} 
                                            value={data.description} 
                                            error={errors.description} 
                                            label="Short Description" 
                                            strLength={data.description.replace(/\s/g, '').length} 
                                            name="description" 
                                            id="description" 
                                            placeholder="Write a brief summary of your blog post (150–300 characters)." 
                                            rows={6} 
                                        />
                                        {
                                            isNull(data.thumbnail) ? (
                                                <>
                                                    <div className={` mt-4`}>
                                                        <label htmlFor="thumbnail" className={`${errors.thumbnail ? ' border-red-500 text-red-300' : 'border-meduim-gray text-meduim-gray'} text-sm cursor-pointer  flex flex-col items-center justify-center h-28 border border-dashed rounded-md`}>
                                                            <FiUploadCloud className=" text-2xl mb-1" />
                                                            Click to upload thumbnails <span className=" text-xs font-medium italic">(File size must not exceed 1MB)</span>
                                                        </label>
                                                        <input onChange={handleOnChangeThumbnail} type="file" accept=".png,.jpg,.jpeg,.webp" hidden id="thumbnail" name="thumbnail" />
                                                    </div>
                                                    {errors.thumbnail && <p className=" text-xs text-red-500 mt-1">{errors.thumbnail}</p>}
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`${errors.thumbnail ? 'border border-red-500 p-1 rounded-md' : ''} mt-4`}>
                                                        <label htmlFor="thumbnail" className=" text-sm font-medium cursor-pointer text-dark-gray flex flex-col items-center justify-center h-auto rounded-md">
                                                            <img src={imagePreview} alt="" className=" rounded-md aspect-video w-full" />
                                                        </label>
                                                        <input onChange={handleOnChangeThumbnail} type="file" accept=".png,.jpg,.jpeg,.webp" hidden id="thumbnail" name="thumbnail" />
                                                    </div>
                                                    {errors.thumbnail && <p className=" text-xs text-red-500 mt-1">{errors.thumbnail}</p>}
                                                </>
                                                
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <Button onClick={closeModal} type="button" title={'Close'} variant="outlined" />
                            <Button type="submit" processing={processing} title={'Proceed'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostTitleModal