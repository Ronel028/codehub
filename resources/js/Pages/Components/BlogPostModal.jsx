import { useRef, useState } from "react"
import { Link, useForm } from "@inertiajs/react"
import { isNull } from "lodash"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css";
import Beatloader from 'react-spinners/BeatLoader'
import { dataURLtoFile } from "../../utils/functions"
import { FaTrash } from "react-icons/fa";

const BlogPostModal = ({ setIsModalOpen }) => {

    const cropperRef = useRef(null)
    const [image, setImage] = useState(null)
    const [cropImage, setCropImage] = useState(null)
    const [previewCropImage, setPreviewCropImage] = useState(null)
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        is_publish: false,
        image: null
    })

    const onChangeImageEvent = (e) => {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        reader.readAsDataURL(image)
        e.target.value = ''
    }

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCropImage(cropper.getCroppedCanvas().toDataURL())
    }

    const saveCropImage = () => {
        const image = dataURLtoFile(cropImage)
        setPreviewCropImage(cropImage)
        setImage(prevState => null)
        setData({
            ...data,
            image: image
        })
    }

    const removeImage = () => {
        setImage(prevState => null)
        setCropImage(prevState => null)
        setPreviewCropImage(prevState => null)
    }

    const store = () => {
        post(`/blog/create-blog-title`, {
            onSuccess: () => {
                setPreviewCropImage(prevState => null)
                setCropImage(prevState => null)
                setIsModalOpen(false)
            },
            onError: error => {
                console.log(error)
                toast.error(error.message)
            }
        })
    }

    return (
        <div className={`relative z-[60]`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity backdrop-blur-sm" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-soft-light text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-soft-light px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900" id="modal-title">Create blog</h3>
                                    <div className="mt-4">
                                        <div className=" mb-3">
                                            <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Write your title here..." className={`${errors.title ? 'focus:outline-red-400 outline-red-400' : 'focus:outline-[#778DA9]'} w-full border border-gray-300  outline-none p-2 text-primary text-xs rounded-md`} />
                                            {errors.title && <p className="mt-1 text-red-400 italic text-xs font-bold">{errors.title}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Start thinking your description..." rows={5} className={`${errors.description ? 'focus:outline-red-400 outline-red-400' : 'focus:outline-[#778DA9]'} w-full border border-gray-300  outline-none p-2 text-primary text-xs rounded-md`}></textarea>
                                            {errors.description && <p className=" text-red-400 italic text-xs font-bold">{errors.description}</p>}
                                        </div>
                                        {
                                            isNull(previewCropImage) ? (
                                                <div className=" mb-3">
                                                    <label
                                                        className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                                                        tabIndex="0">
                                                        <span htmlFor="photo-dropbox" className="flex items-center space-x-2">
                                                            <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                                                                <path
                                                                    d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="24"></path>
                                                                <path
                                                                    d="M80,128a80,80,0,1,1,144,48"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="24"></path>
                                                                <polyline
                                                                    points="118.1 161.9 152 128 185.9 161.9"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="24"></polyline>
                                                                <line
                                                                    x1="152"
                                                                    y1="208"
                                                                    x2="152"
                                                                    y2="128"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="24"></line>
                                                            </svg>
                                                            <span className="text-xs font-medium text-gray-600">
                                                                <span className="text-blue-600 underline mr-1">Browse</span>files to Attach
                                                            </span>
                                                        </span>
                                                        <input onChange={onChangeImageEvent} id="photo-dropbox" type="file" className="sr-only" />
                                                    </label>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            !isNull(image) ? (
                                                <div className=" relative">
                                                    <Cropper
                                                        src={image}
                                                        style={{ height: 200, width: "100%" }}
                                                        initialAspectRatio={4 / 2}
                                                        aspectRatio={4 / 2}
                                                        guides={false}
                                                        crop={onCrop}
                                                        ref={cropperRef}
                                                    />
                                                    <div className=" bg-secondary bg-opacity-80 backdrop-blur-sm h-9 absolute bottom-0 left-0 right-0 flex items-center justify-end gap-1 px-2">
                                                        <button onClick={removeImage} className="inline-flex w-full items-center justify-center rounded bg-red-400 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-opacity-90 sm:w-auto">
                                                            Remove
                                                        </button>
                                                        <button onClick={saveCropImage} className="inline-flex w-full items-center justify-center rounded bg-green-400 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-opacity-90 sm:w-auto">
                                                            Crop
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            !isNull(previewCropImage) ? (
                                                <div className="group relative border-gray-300 rounded overflow-hidden">
                                                    <img src={previewCropImage} alt="" className="rounded aspect-[4/2] w-full" />
                                                    <div className=" group-hover:flex hidden items-center justify-end gap-1 bg-secondary bg-opacity-50 backdrop-blur-sm absolute bottom-0 left-0 right-0 p-2">
                                                        <button title="Remove" onClick={removeImage} className="inline-flex w-full items-center justify-center rounded bg-red-400 p-2 text-xs font-semibold text-white shadow-sm hover:bg-opacity-90 sm:w-auto">
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-light px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={store} disabled={processing} type="button" className="inline-flex w-full min-w-[78.38px] h-9 items-center justify-center rounded bg-yellow-light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:ml-3 sm:w-auto">
                                {processing ? null : "Create"}
                                <Beatloader
                                    color={'#F9F9F9'}
                                    loading={processing}
                                    size={7}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </button>
                            <Link href="/blog-list" className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostModal