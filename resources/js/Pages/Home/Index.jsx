import { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Navigation from "../Components/Navigation";
import { FaCircleArrowRight } from "react-icons/fa6";

const Home = (props) => {

    const { auth } = usePage().props;

    useEffect(() => {
        if (props.email_verified_at == 0) {
            toast.warn('Please verify your account to access the page!')
        } else {
            return
        }
    }, [])

    return (
        <>
            <div className=" w-full h-auto min-h-screen bg-homepage bg-cover bg-[100%]">
                <Navigation user={auth.user} />
                <div className="bg-soft-light/60 w-full h-auto min-h-screen  flex items-center justify-center">
                    <main className="pt-[65px] pb-10">
                        <div className="max-w-[1500px] w-[90%] mx-auto">
                            <h1 className=" header__font text-dark-gray font-bold mb-5">
                                The Developer's Hub: Tips, Tools, and Stories for Coders
                            </h1>
                            <h3 className=" text-xl ms:text-2xl tracking-wide text-dark-gray leading-8 mb-5">
                                Codehub is your online programming journal. From beginner tips to advanced strategies, explore articles that guide you through every step of your coding journey.
                            </h3>
                            <div className=" inline-block">
                                <Link
                                    href="/blog-list"
                                    className="w-full inline-flex items-center gap-2 font-bold bg-[#F4A261] hover:scale-105 py-2 px-3 text-sm rounded-md text-soft-light tracking-wide transition-all ease-linear duration-150"
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
