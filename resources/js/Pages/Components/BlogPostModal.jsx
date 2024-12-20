import { useState } from "react"
import { Link, useForm } from "@inertiajs/react"
import Beatloader from 'react-spinners/BeatLoader'

const BlogPostModal = ({ setIsModalOpen }) => {

    const { data, setData, post, processing, errors } = useForm({
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
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900" id="modal-title">Create blog</h3>
                                    <div className="mt-4">
                                        <div className=" mb-5">
                                            <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Write your title here..." className={`${errors.title ? 'focus:outline-red-400 outline-red-400' : 'focus:outline-[#778DA9]'} w-full border border-[#415A77]  bg-light outline-none p-2 text-primary text-xs rounded-md`} />
                                            {errors.title && <p className="mt-1 text-red-400 italic text-xs font-bold">{errors.title}</p>}
                                        </div>
                                        <div>
                                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Start thinking your description..." rows={5} className={`${errors.description ? 'focus:outline-red-400 outline-red-400' : 'focus:outline-[#778DA9]'} w-full border border-[#415A77] bg-light outline-none p-2 text-primary text-xs rounded-md`}></textarea>
                                            {errors.description && <p className=" text-red-400 italic text-xs font-bold">{errors.description}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={store} disabled={processing} type="button" className="inline-flex w-full min-w-[78.38px] h-9 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:ml-3 sm:w-auto">
                                {processing ? null : "Create"}
                                <Beatloader
                                    color={'#B6BBC4'}
                                    loading={processing}
                                    size={7}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </button>
                            <Link href="/blog-list" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostModal