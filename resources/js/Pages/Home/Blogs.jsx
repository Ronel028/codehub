import moment from "moment";
import { Link } from "@inertiajs/react"
import NoDataFound from "../Components/Nodatafound";
import MainLayout from "../../layout/main";
import imagePlaceholder from "../Assets/Img/placeholder.jpg"

const Blogs = (props) => {

    return (
        <>
            <MainLayout pageTitle="Blogs">
                {
                    props.latest_blog.length > 0 ? (
                        <main className=" grid md:grid-cols-2 gap-1 mb-10">
                            <section className=" flex items-center relative border border-[#778DA9] rounded-md overflow-hidden p-1">
                                <div className=" rounded relative w-full h-full">
                                    <img
                                        className=" w-full h-full object-cover rounded"
                                        src={(props.latest_blog[0].upload && props.latest_blog[0].upload.path) ?? imagePlaceholder}
                                        alt={(props.latest_blog[0].upload && props.latest_blog[0].upload.filename) ?? 'No image available'}
                                    />
                                    <div className="absolute inset-0 bg-secondary bg-opacity-40 rounded"></div>
                                </div>
                                <Link href={`/blog-list/read/${props.latest_blog[0].user.username}/${props.latest_blog[0].id}`}>
                                    <div className=" absolute bottom-4 left-4">
                                        <p className=" font-bold mb-1 text-light blog__title__home">{props.latest_blog[0].title}</p>
                                        <p className="text-xs text-light flex items-center gap-1">
                                            {
                                                props.latest_blog[0].user.full_name != ' ' && props.latest_blog[0].user.full_name != null ? (
                                                    <span>{props.latest_blog[0].user.full_name}</span>
                                                ) : <span>{props.latest_blog[0].user.username}</span>
                                            }
                                            <span>|</span>
                                            <span>{moment(props.latest_blog[0].created_at).format('ll')}</span>
                                        </p>
                                    </div>
                                </Link>
                            </section>
                            <section className=" flex items-start ">
                                <ul className=" flex flex-col gap-2">
                                    {
                                        props.latest_blog.map(blog => (
                                            <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.id}`}>
                                                <li className="grid grid-cols-2 gap-2">
                                                    <div className="w-full aspect-[4/2] rounded border p-1 border-[#415A77]">
                                                        <img
                                                            className="w-full aspect-[4/2] object-cover rounded"
                                                            src={(blog.upload && blog.upload.path) ?? imagePlaceholder}
                                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                        />
                                                    </div>
                                                    <div className="inline-flex justify-center flex-col">
                                                        <div>
                                                            <p className=" font-bold mb-1 text-base sm:text-xl text-[#E0E1DD]">{blog.title}</p>
                                                            <p className="text-xs text-[#E0E1DD] flex items-center gap-1">
                                                                {
                                                                    blog.user.full_name != ' ' && blog.user.full_name != null ? (
                                                                        <span>{blog.user.full_name}</span>
                                                                    ) : <span>{blog.user.username}</span>
                                                                }
                                                                <span>|</span>
                                                                <span>{moment(blog.created_at).format('ll')}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </section>
                        </main>
                    ) : (
                        <NoDataFound content="Uh-oh! No data found. Please be the first to share." />
                    )
                }

                {/* All BLOG */}
                {
                    props.blogs.length > 0 ? (
                        <div className="border-b border-secondary pb-5">
                            <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {
                                    props.blogs.map(blog => (
                                        <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.id}`}>
                                            <div>
                                                <div className="w-full aspect-[4/2] overflow-hidden rounded-t mb-2 border border-[#415A77]">
                                                    <img
                                                        className=" w-full aspect-[4/2] object-cover rounded-t"
                                                        src={(blog.upload && blog.upload.path) ?? imagePlaceholder}
                                                        alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                    />
                                                </div>
                                                <div className=" mb-1">
                                                    <p className=" font-bold mb-1 text-xl text-[#E0E1DD]">{blog.title}</p>
                                                    <p className="text-xs text-[#E0E1DD] flex items-center gap-1">
                                                        {
                                                            blog.user.full_name != ' ' && blog.user.full_name != null ? (
                                                                <span>{blog.user.full_name}</span>
                                                            ) : <span>{blog.user.username}</span>
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
                        </div>
                    ) : null
                }
            </MainLayout>
        </>
    )
}

export default Blogs