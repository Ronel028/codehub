import { Link } from "@inertiajs/react"
import { isNull } from "lodash"
import { MdEditSquare, MdOutlineEditNote } from "react-icons/md"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import moment from "moment"

const BlogPostCard = ({ blogId, username, blogPhoto, isPublish, title, description, createdAt, openEdit }) => {

    return (
        <div className="">
            <div className=" overflow-hidden rounded-t-md mb-2 border border-gray-light">
                <img className=" w-full aspect-[4/2] object-cover rounded-t-md" src={(blogPhoto && blogPhoto.path) ?? imagePlaceholder} alt="" />
            </div>
            <div className=" py-2">
                {
                    openEdit ? (
                        <div className=" flex items-center justify-between mb-2">
                            <div className=" flex items-center gap-1">
                                <div className={`${isPublish === 1 ? 'bg-green-400 text-secondary' : 'bg-red-400 text-[#E0E1DD]'}  rounded py-1 px-2 inline-block text-xs  font-bold`}>
                                    {
                                        isPublish === 1 ? 'Published' : 'Draft'
                                    }
                                </div>
                            </div>
                            <div className=" flex items-center gap-3">
                                <Link title="Edit Post" href={`/blog/create?id=${blogId}`}>
                                    <MdOutlineEditNote className=" text-xl text-dark-gray hover:text-red-400 transition-colors ease-linear duration-150" />
                                </Link>
                            </div>
                        </div>
                    ) : null
                }
                <Link href={`/blog-list/read/${username}/${blogId}`} className=" font-bold text-xl text-dark-gray">
                    {title}
                </Link>
                <p className=" text-xs text-meduim-gray mb-1">{moment(createdAt).format('LL')}</p>
                <p className=" font-medium mb-1 text-sm text-dark-gray">{description}</p>
            </div>
        </div>
    )
}

export default BlogPostCard