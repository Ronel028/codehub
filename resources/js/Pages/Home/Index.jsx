import moment from "moment";
import { Link } from "@inertiajs/react"
import { CiEdit } from "react-icons/ci";
import MainLayout from "../../layout/main";
import imagePlaceholder from "../Assets/Img/placeholder.jpg"

const Home = (props) => {

    console.log(props)

    return (
        <>
            <MainLayout>
                <main className=" grid grid-cols-2 gap-1 mb-10">
                    <section className=" flex items-center relative">
                        <div className=" rounded relative w-full h-full">
                            <img 
                                className=" w-full h-full object-cover rounded" 
                                src={(props.latest_blog[0].upload && `/storage/${props.latest_blog[0].upload.path}`) ?? imagePlaceholder} 
                                alt={(props.latest_blog[0].upload && props.latest_blog[0].upload.filename) ?? 'No image available'}
                            />
                            <div className="absolute inset-0 bg-secondary bg-opacity-40 rounded"></div>
                        </div>
                        <div className=" absolute bottom-4 left-4">
                            <div className=" bg-light rounded py-1 px-2 inline-block text-xs text-primary mb-1">{props.latest_blog[0].category.name}</div>
                            <p className=" font-bold mb-1 text-light text-3xl">{props.latest_blog[0].title}</p>
                            <p className=" text-xs text-light">
                                {(props.latest_blog[0].user.user_detail && props.latest_blog[0].user.full_name) ?? props.latest_blog[0].user.username} | {moment(props.latest_blog[0].created_at).format('ll')}
                            </p>
                        </div>
                    </section>
                    <section className=" flex items-start ">
                        <ul className=" flex flex-col gap-2">
                            {
                                props.latest_blog.map(blog => (
                                    <li key={blog.id} className=" flex items-center gap-2">
                                        <div className=" w-[350px] h-[170px] rounded">
                                            <img 
                                                className=" w-full h-full object-cover rounded" 
                                                src={(blog.upload && `/storage/${blog.upload.path}`) ?? imagePlaceholder} 
                                                alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                            />
                                        </div>
                                        <div>
                                            <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                            <p className=" font-bold mb-1 text-xl">{blog.title}</p>
                                            <p className=" text-xs">
                                            {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                </main>

                {/* TECHNOLOGY BLOG */}
                <div>
                    <h2 className=" text-2xl font-bold tracking-wide mb-2">Technology</h2>
                    <div className=" grid grid-cols-3 gap-2">
                        {
                            props.blogs.filter(blog => (
                                blog.category.name === 'Technology'
                            )).map(blog => (
                                <div key={blog.id}>
                                    <div className=" rounded mb-2">
                                        <img 
                                            className=" w-full h-full object-cover rounded" 
                                            src={(blog.upload && `/storage/${blog.upload.path}`) ?? imagePlaceholder} 
                                            alt={(blog.upload && blog.upload.filename) ?? 'No image available'}
                                        />
                                    </div>
                                    <div className=" mb-1">
                                        <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                        <p className=" font-bold mb-1 text-xl">{blog.title}</p>
                                        <p className=" text-xs">
                                            {(blog.user.user_detail && blog.user.full_name) ?? blog.user.username} | {moment(blog.created_at).format('ll')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className=" font-normal mb-1 text-base">{blog.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Home