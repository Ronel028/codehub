import { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { FaCircleArrowRight } from "react-icons/fa6";
import Navigation from "../Components/Navigation";

const Home = (props) => {

    const { auth } = usePage().props;

    useEffect(() => {
        if(props.email_verified_at == 0){
            toast.warn('Please verify your account to access the page!')
        }else{
            return
        }
    }, [])

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
                            <h3 className=" text-2xl tracking-wide leading-9 mb-5">
                                Welcome to{" "}
                                <span className="font-bold">KNOWL</span>, your
                                ultimate destination for sharing and gaining knowledge and
                                experiences across a wide range of categories.
                                From the latest technology to news, health, and
                                more, we cover it all. Our mission is to provide
                                you with valuable insights and experiences that
                                enhance your daily life. Dive into a diverse
                                collection of articles, guides, and stories
                                crafted by experts and enthusiasts alike.
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
