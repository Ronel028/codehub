import { useState } from "react"
import { useForm } from "@inertiajs/react"

const BlogPostModal = ({ setIsModalOpen }) => {

    const { data, setData, post, processing } = useForm({
        title: '',
        description: '',
        is_publish: false
    })

    const store = () => {
        post(`/blog/create-blog-title`, {
            onSuccess: () => {
                setIsModalOpen(false)
            },
            onError: error => {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className={`relative z-[60]`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900" id="modal-title">Create blog</h3>
                                    <div className="mt-4">
                                        <div className=" mb-5">
                                            <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Write your title here..." className={`w-full border border-[#415A77] focus:outline-[#778DA9] bg-light outline-none p-2 text-primary text-xs rounded-md`} />
                                        </div>
                                        <div>
                                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Start thinking your description..." rows={5} className={`w-full border border-[#415A77] focus:outline-[#778DA9] bg-light outline-none p-2 text-primary text-xs rounded-md`}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={store} type="button" className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:ml-3 sm:w-auto">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostModal