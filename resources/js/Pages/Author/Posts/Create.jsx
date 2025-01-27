import { useEffect, useRef, useState } from "react"
import { router, useForm } from "@inertiajs/react"
import TiptopRte from "../../Components/Markdown/TiptopRte"
import Button from "../../../components/Forms/Button"
import AuthorLayout from "../../../layout/AuthorLayout"
import { MdOutlineCloudUpload, MdOutlinePublishedWithChanges, MdRocketLaunch } from "react-icons/md"
import { BsCloudCheck } from "react-icons/bs"
import { IoReload } from "react-icons/io5"
import { GiSandsOfTime } from "react-icons/gi";
import { RiArchive2Fill } from "react-icons/ri";
import { FaGlobeAmericas } from "react-icons/fa"
import { isNull } from "lodash"
import { FiUploadCloud } from "react-icons/fi"
import { Cropper } from "react-cropper"

const blogStatusBadge = {
    publish: <p className=" text-sm font-medium text-green-500 flex items-center gap-1"><MdRocketLaunch />Published</p>,
    draft: <p className=" text-sm font-bold text-blue-500 flex items-center gap-1"><GiSandsOfTime />Draft</p>,
    archive: <p className=" text-sm font-bold text-red-500 flex items-center gap-1"><RiArchive2Fill />Archive</p>
}

const CreatePost = ({ blogPost }) => {
    const { data, setData, post, processing } = useForm({
        content: blogPost?.content ?? '',
    })
    const imageRef = useRef(null)
    const [imageVal, setImageVal] = useState(null)
    function saveContent(){
        const queryParams = new URLSearchParams(window.location.search)
        const postId = queryParams.get('id');
        post(`/author/post/create/${postId}`, {
            onSuccess: () => {
                console.log('Save success')
            }
        })
    }

    function changeStatus(status){
        const queryParams = new URLSearchParams(window.location.search)
        const postId = queryParams.get('id');
        router.post(`/author/post/change-status/${postId}`, { status: status }, {
            onSuccess: () => {
                console.log('Change status succesfull')
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }
    
    useEffect(() => {
        if(data.content.length > 0 && blogPost?.content !== data.content){
            saveContent()
        }
    }, [data])

    function getImage(command){
        setImageVal(command)
    }

    return (
        <>
            { isNull(imageVal) ? null : <TiptopImage command={imageVal} setCommand={setImageVal} /> }
            <div className="mb-6">
                <h1 className=" text-dark-gray font-medium text-xl">Manage your post</h1>
                <p className=" text-sm text-meduim-gray">Start Create/Edit your blog content here.</p>
            </div>
            <main className=" grid grid-cols-5 gap-2">
                <section className=" col-span-3 border rounded-md border-gray-light">
                    <div className=" p-2">
                        <TiptopRte data={data} setData={setData} getImage={getImage} />
                    </div>
                </section>
                <section className="col-span-2">
                    <div className=" border border-gray-light p-3 rounded-md sticky top-20">
                        <div className="flex items-center justify-between gap-2">
                            <p className={`${processing ? 'text-yellow-light' : 'text-green-500' } font-medium text-sm flex items-center gap-1`}>
                                {
                                    processing ? (
                                        <>
                                            <IoReload className=" text-lg" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <BsCloudCheck className=" text-lg" />
                                            Saved
                                        </>
                                    )
                                }
                            </p>
                            { blogStatusBadge[blogPost.status] }
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{blogPost.title}</h1>
                            <p className=" text-xs mb-2">{blogPost.description}</p>
                        </div>
                        <img className="w-full aspect-video rounded-md mb-2" src={blogPost.upload?.path} alt="" />
                        <div className=" flex items-center justify-end">
                            {
                                blogPost.status === 'publish' ? (
                                    <Button onClick={() => changeStatus('draft')} disabled={data.content.length <= 0} title={'Save to Draft'} icon={<GiSandsOfTime />} style={'bg-muted-accent text-soft-light'} />
                                ) : (
                                    <Button onClick={() => changeStatus('publish')} disabled={data.content.length <= 0} title={'Publish'} icon={<FaGlobeAmericas />} style={'bg-green-500 text-soft-light'} />
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const TiptopImage = ({ command, setCommand }) => {

    const cropperRef = useRef(null)
    const [image, setImage] = useState(null)
    const [cropImage, setCropImage] = useState(null)

    function displayImg(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                // imageVal.setImage({ src: e.target.result })
                setImage(e.target.result)
            };
            reader.readAsDataURL(image);
            e.target.value = "";
        }
    }

     function onCrop(){
        const cropper = cropperRef.current?.cropper;
        const cropImage = cropper.getCroppedCanvas().toDataURL()
        setCropImage(cropImage);
    };

    function save(){
        if(!isNull(image)){
            command.setImage({ src: cropImage })
            setCommand(prevState => prevState = null)
        }
    }

    return (
        <div className={` relative z-50`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className=" flex items-center justify-between gap-2">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Tiptop Image Modal</h3>
                                        {/* <p className=" text-secondary text-sm">
                                            Crop filesize: 
                                            <span 
                                                className={`${photoSize > 1000000 ? 'text-red-500' : 'text-green-500'} ml-1 font-bold`}>{ filesize(photoSize, {standard: "jedec"}) }
                                            </span>
                                        </p> */}
                                    </div>
                                    {/* <div className="mt-4">
                                        <Cropper
                                            src={thumbnail}
                                            style={{ height: 300, width: "100%" }}
                                            initialAspectRatio={16/9}
                                            aspectRatio={16/9}
                                            guides={false}
                                            viewMode={1}
                                            crop={onCrop}
                                            ref={cropperRef}
                                            />
                                    </div> */}
                                    {/* <p className="mt-1 text-sm text-red-500 font-bold">{error?.photo}</p> */}
                                    {
                                        isNull(image) ? (
                                            <div className={` mt-4`}>
                                                <label htmlFor="tiptopImage" className={`border-meduim-gray text-meduim-gray text-sm cursor-pointer  flex flex-col items-center justify-center h-28 border border-dashed rounded-md`}>
                                                    <FiUploadCloud className=" text-2xl mb-1" />
                                                    Click to upload Image.
                                                </label>
                                                <input onChange={displayImg} type="file" accept=".png,.jpg,.jpeg,.webp" hidden id="tiptopImage" name="tiptopImage" />
                                            </div>
                                        ) : (
                                            <Cropper
                                                src={image}
                                                style={{ height: 300, width: "100%" }}
                                                initialAspectRatio={16/9}
                                                aspectRatio={16/9}
                                                guides={false}
                                                viewMode={1}
                                                crop={onCrop}
                                                ref={cropperRef}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            {/* <Button onClick={closeCropModal} variant="outlined" title={'Close'} /> */}
                            <Button onClick={save} title={'Save'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

CreatePost.layout = page => <AuthorLayout children={page} />

export default CreatePost