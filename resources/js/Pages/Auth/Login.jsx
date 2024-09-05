import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Input from "../Components/Forms/Input";
import accessImg from "../Assets/Img/access.jpg"

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    })

    const create = (e) => {
        e.preventDefault()
        post('/authenticate')
    }

    return (
        <>
            <main className=" grid sm:grid-cols-2 h-auto min-h-screen w-full bg-[#1b263b]">
                <div className=" h-screen flex flex-col justify-center px-8 sm:px-10 w-full sm:max-w-96 mx-auto">
                    <div className=" mb-6">
                        <h1 className=" md:text-center font-bold text-3xl tracking-wide mb-2">Hi!</h1>
                        <p className=" md:text-center text-sm tracking-wide">Login your account and start create your blog.</p>
                    </div>
                    <form className="" onSubmit={create}>
                        <div className=" flex flex-col gap-4">
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" type='password' placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button type="submit" className="w-full font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide">Signin</button>
                            </div>
                        </div>
                        <p className=" text-xs text-right tracking-wide mt-2">Don't have an account? <Link href="/register" className="hover:underline">Register</Link></p>
                    </form>
                </div>
                <div className="hidden sm:block">
                    <div className="h-screen w-full">
                        <img className=" w-full h-full object-cover" src={accessImg} alt="Frredom" />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;
