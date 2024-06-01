import { Link, useForm } from "@inertiajs/react";
import Input from "../Components/Forms/Input";
import accessImg from "../Assets/Img/access.jpg"

const Login = () => {

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
            <main className=" grid grid-cols-2 h-auto min-h-screen w-full bg-light">
                <div className=" h-screen flex flex-col items-center justify-center px-32">
                    <div className=" mb-6">
                        <h1 className=" text-center font-bold text-3xl tracking-wide">Login Account</h1>
                        <p className=" text-center text-sm tracking-wide">Login you account to access your and create your blog</p>
                    </div>
                    <form className=" w-full" onSubmit={create}>
                        <div className=" flex flex-col gap-4">
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" type="password" placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button type="submit" className="w-full font-bold bg-secondary py-2 text-sm rounded px-3 text-light tracking-wide">Signin</button>
                            </div>
                        </div>
                        <p className=" text-xs text-right tracking-wide mt-2">Don't have an account? <Link href="/register" className="hover:underline">Register</Link></p>
                    </form>
                </div>
                <div>
                    <div className="h-screen w-full">
                        <img className=" w-full h-full object-cover" src={accessImg} alt="Frredom" />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;
