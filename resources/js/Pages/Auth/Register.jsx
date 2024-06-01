import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import Input from "../Components/Forms/Input";
import freedomImg from "../Assets/Img/freedom.jpg"

const Register = () => {

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        retypePassword: ''
    })

    const create = (e) => {
        e.preventDefault()
        post('/create-account', {
            onSuccess: (e) => {
                toast.success('Account created successful!')
                reset()
            }
        })
    }

    return (
        <>
            <main className=" grid grid-cols-2 h-auto min-h-screen w-full bg-light">
                <div className=" h-screen flex flex-col items-center justify-center px-32">
                    <div className=" mb-6">
                        <h1 className=" text-center font-bold text-3xl tracking-wide">Create Account</h1>
                        <p className=" text-center text-sm tracking-wide">Signup now and unlock exclusive access!</p>
                    </div>
                    <form className=" w-full" onSubmit={create}>
                        <div className=" flex flex-col gap-4">
                            <Input label="Username" error={errors.username} type="text" placeholder="Create unique username" value={data.username} onChange={e => setData('username', e.target.value)} />
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" error={errors.password} type="password" placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <Input label="Retype Password" error={errors.retypePassword} type="password" placeholder="Minimum of 8 character" value={data.retypePassword} onChange={e => setData('retypePassword', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button type="submit" className="w-full font-bold bg-secondary py-2 text-sm rounded px-3 text-light tracking-wide">Signup</button>
                            </div>
                        </div>
                        <p className=" text-xs text-right tracking-wide mt-2">Already have a account? <Link href="/login" className="hover:underline">Signin</Link></p>
                    </form>
                </div>
                <div>
                    <div className="h-screen w-full">
                        <img className=" w-full h-full object-cover" src={freedomImg} alt="Frredom" />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Register;