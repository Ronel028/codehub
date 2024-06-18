import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"

const BlogList = (props) => {

    const [search, setSearch] = useState('')

    const searchBlog = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        router.get('/blog/list', {
            search: search
        }, {
            preserveState: true,
        })
    }, [search])

    return (
        <>
            <MainLayout>
                <div className=" pt-3">
                    <div className=" flex items-center justify-between mb-2">
                        <h2 className=" text-2xl font-bold tracking-wide mb-2">Blog post</h2>
                        <div className=" flex items-center gap-2">
                            <Input placeholder="Search" name="search" value={search} onChange={searchBlog} className=" w-[200px]" />
                        </div>
                    </div>
                    <div className=" grid grid-cols-3 gap-2">
                        {
                            props.blogs.length > 0 ? props.blogs.map(blog => (
                                <div key={blog.id} className="border border-[#415A77] rounded-md">
                                    <div className="h-[250px] overflow-hidden rounded-t-md mb-2">
                                        <img className=" w-full h-full object-cover rounded-t-md" src={ (blog.upload && `/storage/${blog.upload.path}`) ?? imagePlaceholder} alt="" />
                                    </div>
                                    <div className=" p-3">
                                        <div className=" flex items-center justify-between">
                                            <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                            <div className=" flex items-center gap-3">
                                                <button title="Remove">
                                                    <FaTrashAlt className=" text-base fill-red-600" />
                                                </button>
                                                <Link title="Edit" href={`/blog/edit/${blog.id}`}>
                                                    <MdEditSquare className=" text-lg fill-blue-600" />
                                                </Link>
                                            </div>
                                        </div>
                                        <p className=" font-bold mb-1 text-lg">{blog.title}</p>
                                        <p className=" text-xs">{moment(blog.created_at).format('LL')}</p>
                                    </div>
                                </div>
                            )) : <h3>No data found</h3>
                        }
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default BlogList