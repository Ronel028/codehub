import { useState, useEffect } from "react"
import { Link, router } from "@inertiajs/react"
import moment from "moment"
import { debounce } from "lodash"
import Input from "../Components/Forms/Input"
import MainLayout from "../../layout/main"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"
import NoDataFound from "../Components/Nodatafound"

const BlogsListByCategory = (props) => {

    const [search, setSearch] = useState('')

    const searchBlog = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const searchDeb = debounce(() => {
            router.get(`/blog-list/blog/${props.category}`, {
                search: search
            }, {
                preserveState: true,
            })
        }, 300)

        searchDeb();

        return () => searchDeb.cancel();

    }, [search])

    return (
        <>
            <MainLayout setSearch={searchBlog} search={search}>
                <main className=" pt-2">
                    {
                         props.blogs.length > 0 ? (
                            <div className=" grid grid-cols-3 gap-2">
                                    {
                                        props.blogs.map(blog => (
                                            <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.slug}`}>
                                                <div>
                                                    <div className="h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]">
                                                        <img 
                                                            className=" w-full h-full object-cover rounded" 
                                                            src={(blog.upload && blog.upload.path) ?? imagePlaceholder} 
                                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                        />
                                                    </div>
                                                    <div className=" mb-1">
                                                        <div className=" bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1">{props.category}</div>
                                                        <p className=" font-bold mb-1 text-xl">{blog.title}</p>
                                                        <p className="text-xs text-[#E0E1DD] flex items-center gap-1">
                                                            {
                                                                blog.user.full_name != ' ' && blog.user.full_name != null ? (
                                                                    <span>{blog.user.full_name}</span>
                                                                ) :  <span>{blog.user.username}</span>
                                                            }
                                                            <span>|</span>
                                                            <span>{moment(blog.created_at).format('ll')}</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className=" font-normal mb-1 text-gray-400 text-base">{blog.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                         ) : (
                            <NoDataFound content="Uh-oh! No data found." /> 
                         )
                    }
                </main>
            </MainLayout>
        </>
    )
}

export default BlogsListByCategory