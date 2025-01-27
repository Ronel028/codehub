import { Link } from "@inertiajs/react"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import moment from "moment"

const BlogPostCard = ({ blogId, slug, username, fullName, blogPhoto, title, description, createdAt }) => {

    return (
        <div className="border-b border-x border-gray-light rounded-md shadow shadow-gray-light">
            <div className=" overflow-hidden rounded-t-md">
                <img className=" w-full aspect-video object-cover rounded-t-md" src={(blogPhoto && blogPhoto.path) ?? imagePlaceholder} alt="" />
            </div>
            <div className=" py-2 px-3">
                <div className=" w-full truncate">
                    <Link title={title} href={`/blog-list/read/${username}/${slug}`} className=" font-bold text-xl text-dark-gray hover:underline">
                        {title}
                    </Link>
                </div>
                <p className="flex items-center gap-1 text-xs text-meduim-gray mb-1">
                    <span>{fullName ?? username}</span>
                    <span>|</span>
                    <span>{moment(createdAt).format('LL')}</span>
                </p>
                <div className="text-overflow-clamp">
                    <p className=" font-medium mb-1 text-sm text-dark-gray">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPostCard