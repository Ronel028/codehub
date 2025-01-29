import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
// import Input from "../Components/Forms/Input";
import Input from "../../components/Forms/Input";
import Beatloader from 'react-spinners/BeatLoader'
import accessImg from "../Assets/Img/access.jpg"
import { FaLaptopCode } from "react-icons/fa";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    })

    const create = (e) => {
        e.preventDefault()
        post('/authenticate', {
            headers: {
                'Access-Control-Expose-Headers': 'X-Inertia'
            }
        })
    }

    return (
        <>
            <main className=" h-auto min-h-screen w-full bg-homepage bg-cover bg-center flex items-center justify-center">
                <div className="flex flex-col justify-center py-10 px-8 sm:px-10 w-full sm:max-w-[460px] mx-auto bg-soft-light border border-gray-light rounded-md">
                    <div className=" mb-6">
                        <div className="flex items-center justify-center mb-4">
                            <Link href="/" className=" flex items-center font-bold text-red-400 font-courier-prime text-2xl">
                                C
                                <FaLaptopCode className="px-[0.0625rem] text-2xl text-meduim-gray" />
                                DE HUB
                            </Link>
                        </div>
                        <h1 className=" font-bold text-2xl tracking-wide text-dark-gray">Hi!</h1>
                        <p className=" text-sm tracking-wide text-dark-gray">Login your account and start create your blog.</p>
                    </div>
                    <form className="" onSubmit={create}>
                        <div className=" flex flex-col gap-4">
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" type='password' placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button disabled={processing} type="submit" className="w-full h-9 flex items-center justify-center font-bold bg-yellow-light py-2 text-sm rounded px-3 text-light tracking-wide">
                                    {processing ? null : 'Signin'}
                                    <Beatloader
                                        color={'#F9F9F9'}
                                        loading={processing}
                                        size={9}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </button>
                            </div>
                        </div>
                        <p className=" text-xs text-right tracking-wide mt-2">Don't have an account? <Link href="/register" className="hover:underline">Register</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;
