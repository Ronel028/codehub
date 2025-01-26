import { useContext, useState } from "react"
import PostTitleCreationProvider, { PostTitleCreationContext } from "../../../context/PostCreationContext"
import AuthorLayout from "../../../layout/AuthorLayout"
import PostTitleModal from "../../../components/Author/Post/PostTitleModal"
import Button from "../../../components/Forms/Button"
import { IoCreateOutline } from "react-icons/io5"
import PostThumbnailModal from "../../../components/Author/Post/PostThumbnailModal"
import { capitalize, truncate } from "lodash"
import moment from "moment"
import { FaArchive, FaTrashAlt } from "react-icons/fa"
import { TfiWrite } from "react-icons/tfi";
import { Link } from "@inertiajs/react"

const PostIndex = ({blogPost}) => {
    const { openModal } = useContext(PostTitleCreationContext)
    return (
        <>
            <PostTitleModal />
            <PostThumbnailModal title={'Edit your Thumbnail.'} />
            <main>
                <h1 className=" text-primary font-bold text-2xl mb-6">
                    All post
                </h1>
                <div>
                    <Button onClick={openModal} title={'Create New'} icon={<IoCreateOutline className="text-lg" />} />
                </div>
                <div className=" mt-4">
                    <section>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-dark-gray">
                                <thead class="text-xs text-dark-gray uppercase bg-yellow-light">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date Created
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        blogPost.length > 0 ? (
                                            blogPost.map(value => (
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden">
                                                        {truncate(value.title, { length: 25 })}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {truncate(value.description, { length: 40 })}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {capitalize(value.status)}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap overflow-hidden">
                                                        {moment(value.created_at).format('LL')}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap overflow-hidden">
                                                        <div className=" flex items-center gap-1">
                                                            <Link href={`/author/post/create?id=${value.id}`}><TfiWrite className=" text-vibrant-blue text-lg" /></Link>
                                                            <button><FaTrashAlt className=" text-red-500 text-lg" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

const PostParent = (props) => {
    const { blogPost } = props
    return (
        <PostTitleCreationProvider>
            <PostIndex blogPost={blogPost} />
        </PostTitleCreationProvider>
    )
}

PostParent.layout = page => <AuthorLayout children={page} />

export default PostParent