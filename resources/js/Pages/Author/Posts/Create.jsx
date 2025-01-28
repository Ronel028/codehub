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
import Tiptop from "../../../components/WYSIWYG/Tiptop"
import TiptopImageUploadModal from "../../../components/WYSIWYG/TiptopImageUploadModal"

const blogStatusBadge = {
    publish: <p className=" text-sm font-medium text-green-500 flex items-center gap-1"><MdRocketLaunch />Published</p>,
    draft: <p className=" text-sm font-bold text-blue-500 flex items-center gap-1"><GiSandsOfTime />Draft</p>,
    archive: <p className=" text-sm font-bold text-red-500 flex items-center gap-1"><RiArchive2Fill />Archive</p>
}

const CreatePost = ({ blogPost }) => {
    const { data, setData, post, processing } = useForm({
        content: blogPost?.content ?? '',
    })
    const [tiptopCommand, setTiptopCommand] = useState(null)

    function saveContent(){
        const queryParams = new URLSearchParams(window.location.search)
        const postId = queryParams.get('id');
        post(`/author/post/create/${postId}`, {
            onSuccess: () => {
                // console.log('Save success')
            },
            onError: (error) => {
                alert(error)
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
        setTiptopCommand(command)
    }

    return (
        <>
            { isNull(tiptopCommand) ? null : <TiptopImageUploadModal command={tiptopCommand} setCommand={setTiptopCommand} /> }
            <div className="mb-6">
                <h1 className=" text-dark-gray font-medium text-xl">Manage your post</h1>
                <p className=" text-sm text-meduim-gray">Start Create/Edit your blog content here.</p>
            </div>
            <main className=" grid grid-cols-5 gap-2">
                <section className=" col-span-3 border rounded-md border-gray-light">
                    <div className=" p-2">
                        <Tiptop data={data} setData={setData} getImage={getImage} />
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

CreatePost.layout = page => <AuthorLayout children={page} />

export default CreatePost