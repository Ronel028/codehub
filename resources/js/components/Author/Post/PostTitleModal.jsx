import { useContext, useEffect, useState } from "react"
import { isNull } from "lodash"
import { PostTitleCreationContext } from "../../../context/PostCreationContext"
import Button from "../../Forms/Button"
import Input from "../../Forms/Input"
import { IoCloudUploadOutline, IoCreateOutline } from "react-icons/io5"
import TextArea from "../../Forms/TextArea"
import { FaRegImages } from "react-icons/fa"

const PostTitleModal = ({ openModal, close }) => {

    const { data, handleOnchage, handleOnChangeThumbnail, save, processing, isModalOpen, closeModal } = useContext(PostTitleCreationContext);
    const [imagePreview, setImagePreview] = useState(null)
    
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
        <div className={`${isModalOpen ? 'block' : 'hidden'} relative z-50`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form
                        // onSubmit={save}
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
                                        <Input onChange={handleOnchage} value={data.title} label="Title" name="title" id="title" placeholder="Type the title of your blog post" className="mb-4" />
                                        <TextArea onChange={handleOnchage} value={data.description} label="Short Description" name="description" id="description" placeholder="Add a brief description of your content" rows={6} />
                                        {
                                            isNull(data.thumbnail) ? (
                                                <div className=" mt-4">
                                                    <label htmlFor="thumbnail" className="text-sm font-medium cursor-pointer text-dark-gray flex flex-col items-center justify-center h-28 border border-dashed border-meduim-gray rounded-md">
                                                        <FaRegImages className=" text-3xl mb-1 text-muted-accent" />
                                                        Click to upload your thumbnails.
                                                    </label>
                                                    <input onChange={handleOnChangeThumbnail} type="file" hidden id="thumbnail" name="thumbnail" />
                                                </div>
                                            ) : (
                                                <img src={imagePreview} alt="" className="mt-4 aspect-video w-full" />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <Button onClick={closeModal} type="button" title={'Close'} variant="outlined" />
                            <Button onClick={save} processing={processing} title={'Proceed'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostTitleModal