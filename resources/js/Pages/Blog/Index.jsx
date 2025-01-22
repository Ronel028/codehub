import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { debounce } from "lodash"
import NoDataFound from "../Components/Nodatafound";
import BlogPostCard from "../Components/BlogPostCard";
import { MdEditSquare } from "react-icons/md";
import MainLayout from "../../layout/main"
import imagePlaceholder from "../Assets/Img/placeholder.jpg"

const BlogList = (props) => {

    const [search, setSearch] = useState('')

    const searchBlog = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {

        const searchDeb = debounce(() => {
            router.get('/blog/list', {
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
                <div className=" pt-3">
                    <div className=" flex items-center justify-between mb-2">
                        <h2 className="text-dark-gray text-2xl font-bold tracking-wide mb-2">Blog post</h2>
                    </div>
                    {
                        props.blogs.length > 0 ? (
                            <div className=" grid grid-cols-3 gap-2">
                                {
                                    props.blogs.map(blog => (
                                        <BlogPostCard
                                            key={blog.id}
                                            blogId={blog.id}
                                            username={blog.user.username}
                                            title={blog.title}
                                            description={blog.description}
                                            createdAt={blog.created_at}
                                            isPublish={blog.is_published}
                                            blogPhoto={blog.upload}
                                            openEdit={true}
                                        />
                                    ))
                                }
                            </div>
                        ) : <NoDataFound title="EMPTY!" content="Be the first to share your expertise!" />
                    }
                </div>
            </MainLayout>
        </>
    )
}

export default BlogList