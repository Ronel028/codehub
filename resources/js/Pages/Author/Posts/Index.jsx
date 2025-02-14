import { useContext } from "react"
import PostTitleCreationProvider, { PostTitleCreationContext } from "../../../context/PostCreationContext"
import AuthorLayout from "../../../layout/AuthorLayout"
import PostTitleModal from "../../../components/Author/Post/PostTitleModal"
import Button from "../../../components/Forms/Button"
import { IoCreateOutline } from "react-icons/io5"
import PostThumbnailModal from "../../../components/Author/Post/PostThumbnailModal"
import { truncate } from "lodash"
import moment from "moment"
import { FaTrashAlt } from "react-icons/fa"
import { TfiWrite } from "react-icons/tfi";
import { Link } from "@inertiajs/react"
import { MdRocketLaunch } from "react-icons/md"
import { GiSandsOfTime } from "react-icons/gi"
import { RiArchive2Fill } from "react-icons/ri"

const blogStatusBadge = {
    publish: <p className=" text-xs font-medium text-green-500 flex items-center gap-1"><MdRocketLaunch className="text-lg" />Published</p>,
    draft: <p className=" text-xs font-bold text-blue-500 flex items-center gap-1"><GiSandsOfTime className="text-lg" />Draft</p>,
    archive: <p className=" text-xs font-bold text-red-500 flex items-center gap-1"><RiArchive2Fill className="text-lg" />Archive</p>
}

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
                        <div className="relative overflow-x-auto border border-gray-light shadow rounded">
                            <table className="w-full text-sm text-left rtl:text-right text-dark-gray">
                                <thead className="text-xs text-dark-gray uppercase bg-yellow-light">
                                    <tr className="divide-x divide-gray-light">
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date Created
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {
                                        blogPost.length > 0 ? (
                                            blogPost.map(value => (
                                                <tr key={value.id} className="bg-soft-light divide-x divide-gray-light border-b border-gray-light">
                                                    <th scope="row" className="text-xs px-6 py-1 font-medium text-dark-gray whitespace-nowrap overflow-hidden">
                                                        {truncate(value.title, { length: 25 })}
                                                    </th>
                                                    <td className="px-6 py-1 text-xs text-nowrap">
                                                        {truncate(value.description, { length: 30 })}
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        {/* {capitalize(value.status)} */}
                                                        { blogStatusBadge[value.status] }
                                                    </td>
                                                    <td className="px-6 py-1 whitespace-nowrap overflow-hidden text-xs">
                                                        {moment(value.created_at).format('LL')}
                                                    </td>
                                                    <td className="px-6 py-1 whitespace-nowrap overflow-hidden">
                                                        <div className=" flex items-center gap-1">
                                                            <Link href={`/author/post/create?id=${value.id}`} title="Edit Content" className="flex items-center gap-1 bg-muted-accent px-2 py-2 rounded shadow-md shadow-gray-light text-soft-light text-xs font-medium">
                                                                <TfiWrite className=" text-sm" />
                                                                Content
                                                            </Link>
                                                            <button title="Remove" className="flex items-center gap-1 bg-red-500 px-2 py-2 rounded shadow-md shadow-gray-light text-soft-light text-xs font-medium">
                                                                <FaTrashAlt className="text-sm" />
                                                                Remove
                                                            </button>
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