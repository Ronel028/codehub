import { Link } from "@inertiajs/react"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import moment from "moment"
import { limitStr } from "../../utils/functions"

const BlogPostCard = ({ blogId, username, fullName, blogPhoto, title, description, createdAt }) => {

    return (
        <div className=" rounded-md shadow-sm shadow-gray-light">
            <div className=" overflow-hidden rounded-t-md border border-gray-light">
                <img className=" w-full aspect-[4/2] object-cover rounded-t-md" src={(blogPhoto && blogPhoto.path) ?? imagePlaceholder} alt="" />
            </div>
            <div className=" py-2 px-3 border-b border-x border-gray-light">
                <div className=" w-full truncate">
                    <Link title={title} href={`/blog-list/read/${username}/${blogId}`} className=" font-bold text-xl text-dark-gray hover:underline">
                        {title}
                    </Link>
                </div>
                <p className="flex items-center gap-1 text-xs text-meduim-gray mb-1">
                    <span>{fullName ?? username}</span>
                    <span>|</span>
                    <span>{moment(createdAt).format('LL')}</span>
                </p>
                <p className=" font-medium mb-1 text-sm text-dark-gray">{limitStr(description, 90)}</p>
            </div>
        </div>
    )
}

export default BlogPostCard