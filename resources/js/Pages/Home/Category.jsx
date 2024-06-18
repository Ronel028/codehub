import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import moment from "moment"
import Input from "../Components/Forms/Input"
import MainLayout from "../../layout/main"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"

const BlogsListByCategory = (props) => {

    console.log(props)

    const [search, setSearch] = useState('')

    const searchBlog = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        router.get(`/blog-list/blog/${props.category}`, {
            search: search
        }, {
            preserveState: true,
        })
    }, [search])

    return (
        <>
            <MainLayout>
                <div className=" fixed top-[57px] py-4 left-0 right-0 bg-primary flex flex-col  justify-center">
                    <h1 className=" capitalize text-light font-bold text-3xl text-center mb-2">{props.category}</h1>
                   <div className=" px-16">
                        <Input placeholder={`Search blog related to ${props.category}...`} value={search} onChange={searchBlog} />
                   </div>
                </div>
                <main className=" pt-[105px]">
                   <div className=" grid grid-cols-3 gap-2">
                        {
                            props.blogs.map(blog => (
                                <div key={blog.id}>
                                    <div className=" rounded mb-2">
                                        <img 
                                            className=" w-full h-full object-cover rounded" 
                                            src={(blog.upload && `/storage/${blog.upload.path}`) ?? imagePlaceholder} 
                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                        />
                                    </div>
                                    <div className=" mb-1">
                                        <div className=" bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1">{props.category}</div>
                                        <p className=" font-bold mb-1 text-xl">{blog.title}</p>
                                        <p className=" text-xs">
                                            {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className=" font-normal mb-1 text-gray-400 text-base">{blog.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </main>
            </MainLayout>
        </>
    )
}

export default BlogsListByCategory