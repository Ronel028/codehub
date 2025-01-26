import { useEffect, useState } from "react"
import { useForm } from "@inertiajs/react"
import TiptopRte from "../../Components/Markdown/TiptopRte"
import Button from "../../../components/Forms/Button"
import AuthorLayout from "../../../layout/AuthorLayout"
import { MdOutlinePublishedWithChanges } from "react-icons/md"

const CreatePost = ({ blogPost }) => {
    const { data, setData, post, processing } = useForm({
        content: blogPost.content ?? '',
    })

    function saveContent(){
        const queryParams = new URLSearchParams(window.location.search)
        const postId = queryParams.get('id');
        post(`/author/post/create/${postId}`, {
            onSuccess: () => {
                console.log('Save success')
            }
        })
    }
    
    useEffect(() => {
        saveContent()
    }, [data])

    // useEffect(() => {
    //     setData({
    //         ...data,
    //         content: blogPost.content
    //     })
    // }, [])

    return (
        <>
            <h1 className=" text-meduim-gray font-medium text-xl mb-6">Create new post</h1>
            <main className=" grid grid-cols-5 gap-2">
                <section className=" col-span-3">
                    <div className=" border rounded-md border-gray-light p-2">
                        <TiptopRte data={data} setData={setData} />
                    </div>
                </section>
                <section className="col-span-2">
                    <div className=" border border-gray-light p-3 rounded-md">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">{blogPost.title}</h1>
                            <p className=" text-xs mb-2">{blogPost.description}</p>
                        </div>
                        <img className="w-full aspect-video rounded-md mb-2" src={blogPost.upload?.path} alt="" />
                        <div className=" flex items-center justify-end">
                            <Button title={'Publish'} icon={<MdOutlinePublishedWithChanges />} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

CreatePost.layout = page => <AuthorLayout children={page} />

export default CreatePost