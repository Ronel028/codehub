import MainLayout from "../../layout/main"
import Input from "../Components/Forms/Input"
import Select from "../Components/Forms/Select"

const BlogList = (props) => {
    return (
        <>
            <MainLayout>
                <div className=" pt-3">
                    <div className=" flex items-center justify-between mb-2">
                        <h2 className=" text-2xl font-bold tracking-wide mb-2">Blog post</h2>
                        <div className=" flex items-center gap-2">
                            <Input placeholder="Search" className=" w-[200px]" />
                        </div>
                    </div>
                    <div className=" grid grid-cols-3 gap-2">
                        {
                            props.blogs.map(blog => (
                                <div key={blog.id}>
                                    <div className=" rounded mb-2">
                                        <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                    </div>
                                    <div>
                                        <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">{blog.category.name}</div>
                                        <p className=" font-bold mb-1 text-lg">{blog.title}</p>
                                        <p className=" text-xs">{blog.created_at}</p>
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

export default BlogList