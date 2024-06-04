import { Link } from "@inertiajs/react"
import { CiEdit } from "react-icons/ci";
import MainLayout from "../../layout/main";

const Home = () => {
    return (
        <>
            <MainLayout>
                <main className=" grid grid-cols-2 gap-1 mb-10">
                    <section className=" flex items-center relative">
                        <div className=" rounded relative w-full h-full">
                            <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            <div className="absolute inset-0 bg-secondary bg-opacity-40 rounded"></div>
                        </div>
                        <div className=" absolute bottom-4 left-4">
                            <div className=" bg-light rounded py-1 px-2 inline-block text-xs text-primary mb-1">Technology</div>
                            <p className=" font-bold mb-1 text-light text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                            <p className=" text-xs text-light">June 28, 2024</p>
                        </div>
                    </section>
                    <section className=" flex items-center">
                        <ul className=" flex flex-col gap-2">
                            <li className=" flex items-center gap-2">
                                <div className=" w-[350px] h-full rounded">
                                    <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                </div>
                                <div>
                                    <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                    <p className=" font-bold mb-1 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                    <p className=" text-xs">June 28, 2024</p>
                                </div>
                            </li>
                            <li className=" flex items-center gap-2">
                                <div className=" w-[350px] h-full rounded">
                                    <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                </div>
                                <div>
                                    <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                    <p className=" font-bold mb-1 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                    <p className=" text-xs">June 28, 2024</p>
                                </div>
                            </li>
                            <li className=" flex items-center gap-2">
                                <div className=" w-[350px] h-full rounded">
                                    <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                </div>
                                <div>
                                    <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                    <p className=" font-bold mb-1 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                    <p className=" text-xs">June 28, 2024</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </main>

                <div>
                    <h2 className=" text-2xl font-bold tracking-wide mb-2">Technology</h2>
                    <div className=" grid grid-cols-3 gap-2">
                        <div>
                            <div className=" rounded mb-2">
                                <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            </div>
                            <div>
                                <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                <p className=" font-bold mb-1 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                <p className=" text-xs">June 28, 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className=" rounded mb-2">
                                <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            </div>
                            <div>
                                <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                <p className=" font-bold mb-1 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                <p className=" text-xs">June 28, 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className=" rounded mb-2">
                                <img className=" w-full h-full object-cover rounded" src="https://images.pexels.com/photos/19395799/pexels-photo-19395799/free-photo-of-aerial-view-of-paris-on-the-banks-of-river-seine-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            </div>
                            <div>
                                <div className=" bg-primary rounded py-1 px-2 inline-block text-xs text-light mb-1">Technology</div>
                                <p className=" font-bold mb-1 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem!</p>
                                <p className=" text-xs">June 28, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Home