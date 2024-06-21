import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import NoDataFound from "../Components/Nodatafound";

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

    console.log(props)

    return (
        <>
            <MainLayout setSearch={searchBlog} search={search}>
                <div className=" pt-3">
                    <div className=" flex items-center justify-between mb-2">
                        <h2 className=" text-2xl font-bold tracking-wide mb-2">Blog post</h2>
                    </div>
                    {
                         props.blogs.length > 0 ? (
                            <div className=" grid grid-cols-3 gap-2">
                                {
                                    props.blogs.map(blog => (
                                        <div key={blog.id} className="">
                                            <div className="h-[250px] overflow-hidden rounded-t-md mb-2 border border-[#415A77] rounded-md">
                                                <img className=" w-full h-full object-cover rounded-t-md" src={ (blog.upload && blog.upload.path) ?? imagePlaceholder} alt="" />
                                            </div>
                                            <div className=" py-2">
                                                <div className=" flex items-center justify-between">
                                                    <div className=" flex items-center gap-1">
                                                        <div className=" bg-[#415A77] rounded py-1 px-2 inline-block text-xs text-light mb-2">{blog.category.name}</div>
                                                        <div className={`${blog.is_published === 1 ? 'bg-green-500 text-[#1B263B]' : 'bg-red-500 text-[#E0E1DD]'}  rounded py-1 px-2 inline-block text-xs  font-bold mb-2`}>
                                                            {
                                                                blog.is_published === 1 ? 'Published' : 'Draft'
                                                            }
                                                        </div>
                                                    </div>
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
                                    ))
                                }
                            </div>
                         ) : <NoDataFound content="Uh-oh! No data found." /> 
                    }
                </div>
            </MainLayout>
        </>
    )
}

export default BlogList