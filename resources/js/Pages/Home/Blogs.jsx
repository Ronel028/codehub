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
                        <main className=" grid grid-cols-2 gap-1 mb-10">
                            <section className=" flex items-center relative border border-[#778DA9] rounded-md overflow-hidden p-1">
                                    <div className=" rounded relative w-full h-full">
                                        <img 
                                            className=" w-full h-full object-cover rounded" 
                                            src={(props.latest_blog[0].upload && props.latest_blog[0].upload.path) ?? imagePlaceholder} 
                                            alt={(props.latest_blog[0].upload && props.latest_blog[0].upload.filename) ?? 'No image available'}
                                        />
                                        <div className="absolute inset-0 bg-secondary bg-opacity-40 rounded"></div>
                                    </div>
                                    <Link href={`/blog-list/read/${props.latest_blog[0].user.username}/${props.latest_blog[0].slug}`}>
                                        <div className=" absolute bottom-4 left-4">
                                            <div className=" bg-light rounded py-1 px-2 inline-block text-xs text-primary mb-1">{props.latest_blog[0].category.name}</div>
                                            <p className=" font-bold mb-1 text-light text-3xl">{props.latest_blog[0].title}</p>
                                            <p className=" text-xs text-light">
                                                {(props.latest_blog[0].user.user_detail && props.latest_blog[0].user.full_name) ?? props.latest_blog[0].user.username} | {moment(props.latest_blog[0].created_at).format('ll')}
                                            </p>
                                        </div>
                                    </Link>
                            </section>
                            <section className=" flex items-start ">
                                <ul className=" flex flex-col gap-2">
                                    {
                                        props.latest_blog.map(blog => (
                                            <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.slug}`}>
                                                <li className="grid grid-cols-2 gap-2">
                                                    <div className=" w-full h-[170px] rounded border p-1 border-[#415A77]">
                                                        <img 
                                                            className=" w-full h-full object-cover rounded" 
                                                            src={(blog.upload && blog.upload.path) ?? imagePlaceholder} 
                                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                        />
                                                    </div>
                                                    <div className="inline-flex justify-center flex-col">
                                                        <div>
                                                            <div className=" bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                                            <p className=" font-bold mb-1 text-xl text-[#E0E1DD]">{blog.title}</p>
                                                            <p className=" text-xs text-[#E0E1DD]">
                                                            {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
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

                {
                    props.latest_blog.length > 0 ? (
                        <div className="mb-10 flex items-center gap-2">
                            {
                                props.categories.map(category => (
                                    <Link key={category.id} href={`/blog-list/blog/${category.name.toLowerCase()}`} className="flex items-center shadow gap-2 text-xs border border-[#415a77] hover:bg-[#415a77] text-light py-2 px-3 rounded-md">
                                        {category.name}
                                    </Link>
                                ))
                            }
                        </div>       
                    ) : null
                }
                
                {/* TECHNOLOGY BLOG */}
                {
                    props.blogs.filter(blog => (
                        blog.category.name === 'Technology' || blog.category.name === 'Programming'
                    )).length > 0 ? (
                        <div className=" border-b border-secondary pb-5 mb-5">
                            <div className=" flex items-center justify-between mb-1">
                                <h2 className=" text-2xl font-bold tracking-wide text-[#E0E1DD]">Technology</h2>
                                <Link href="/blog-list/blog/technology" className="text-sm text-[#E0E1DD] hover:underline">
                                    See all
                                </Link>
                            </div>
                            <div className=" grid grid-cols-3 gap-2">
                                {
                                    props.blogs.filter(blog => (
                                        blog.category.name === 'Technology' || blog.category.name === 'Programming'
                                    )).slice(0,6).map(blog => (
                                        <Link key={blog.id} href={`/blog-list/read/${blog.user.username}/${blog.slug}`}>
                                            <div>
                                                <div className=" h-[250px] overflow-hidden rounded mb-2 border border-[#415A77]">
                                                    <img 
                                                        className=" w-full h-full object-cover rounded" 
                                                        src={(blog.upload && blog.upload.path) ?? imagePlaceholder} 
                                                        alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                                    />
                                                </div>
                                                <div className=" mb-1">
                                                    <div className=" bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                                    <p className=" font-bold mb-1 text-xl text-[#E0E1DD]">{blog.title}</p>
                                                    <p className=" text-xs text-[#E0E1DD]">
                                                        {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className=" font-normal mb-1  text-sm text-gray-400">{blog.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ) : null
                }

                {/* All BLOG */}
                {
                     props.blogs.length > 0 ? (
                        <div className="border-b border-secondary pb-5 mb-5">
                            <div className=" grid grid-cols-3 gap-3">
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
                                                    <div className=" bg-[#415a77] rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                                    <p className=" font-bold mb-1 text-xl text-[#E0E1DD]">{blog.title}</p>
                                                    <p className=" text-xs text-[#E0E1DD]">
                                                        {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
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