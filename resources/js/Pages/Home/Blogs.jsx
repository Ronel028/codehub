import MainLayout from "../../layout/main";
import NoDataFound from "../Components/Nodatafound";
import BlogPostCard from "../Components/BlogPostCard";

const Blogs = (props) => {
    const { blogs } = props
    console.log(blogs)
    return (
        <>
            <MainLayout pageTitle="Blogs">
                {/* All BLOG */}
                {
                    blogs.length > 0 ? (
                        <div className="pb-5">
                            <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {
                                    blogs.map(blog => (
                                        <BlogPostCard
                                            key={blog.id}
                                            blogId={blog.id}
                                            username={blog.user.username}
                                            fullName={blog.user?.user_detail?.full_name}
                                            title={blog.title}
                                            description={blog.description}
                                            createdAt={blog.created_at}
                                            blogPhoto={blog.upload}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ) : <NoDataFound title="EMPTY!" content="Be the first to share your expertise!" />
                }
            </MainLayout>
        </>
    )
}

export default Blogs