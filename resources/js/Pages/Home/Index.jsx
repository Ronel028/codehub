import { Link, usePage } from "@inertiajs/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import Navigation from "../Components/Navigation";

const Home = () => {
    const { auth } = usePage().props;

    return (
        <>
            <div className=" w-full h-auto min-h-screen bg-homepage bg-cover bg-center">
                <Navigation user={auth.user} />
                <div className="bg-[#1B263B] bg-opacity-80 w-full h-auto min-h-screen  flex items-center justify-center">
                    <main className="pt-[65px] pb-10">
                        <div className="max-w-[1500px] w-[90%] mx-auto">
                            <h1 className=" text-7xl font-bold mb-5">
                                Informative Tips, News and Stories for Every Day
                            </h1>
                            <h3 className=" text-2xl leading-8 mb-5">
                                Welcome to our blog, your ultimate destination
                                for sharing knowledge and experiences across a
                                wide range of topics. From the latest tech
                                trends to personal development, health, and
                                wellness, we cover it all. Our mission is to
                                provide you with valuable insights and
                                inspirational stories that empower you to make
                                informed decisions and lead a fulfilling life.
                                Dive into a diverse collection of articles,
                                guides, and stories crafted by experts and
                                enthusiasts alike.
                            </h3>
                            <div className=" inline-block">
                                <Link
                                    href="/blog-list"
                                    className="w-full inline-flex items-center gap-2 font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide"
                                >
                                    Start Reading
                                    <FaCircleArrowRight />
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Home;
