import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import Input from "../Components/Forms/Input";
import Beatloader from 'react-spinners/BeatLoader'
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
            <main className=" h-auto min-h-screen w-full bg-[#1b263b]">
                <div className=" h-screen flex flex-col justify-center px-8 sm:px-10 w-full sm:max-w-[460px] mx-auto">
                    <div className=" mb-6">
                        <h1 className=" md:text-center font-bold text-3xl tracking-wide">Hello!</h1>
                        <p className=" md:text-center text-sm tracking-wide">Create your account.</p>
                    </div>
                    <form onSubmit={create}>
                        <div className=" flex flex-col gap-3 sm:gap-4">
                            <Input label="Username" error={errors.username} type="text" placeholder="Create unique username" value={data.username} onChange={e => setData('username', e.target.value)} />
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" error={errors.password} type="password" placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <Input label="Retype Password" error={errors.retypePassword} type="password" placeholder="Minimum of 8 character" value={data.retypePassword} onChange={e => setData('retypePassword', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button disabled={processing} type="submit" className="w-full h-9 flex items-center justify-center font-bold bg-[#415A77] py-2 text-sm rounded px-3 text-light tracking-wide">
                                    {processing ? null : 'Signup'}
                                    <Beatloader
                                        color={'#B6BBC4'}
                                        loading={processing}
                                        size={9}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </button>
                            </div>
                        </div>
                        <p className=" text-xs text-right tracking-wide mt-2">Already have a account? <Link href="/login" className="hover:underline">Signin</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register;