import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import Input from "../../components/Forms/Input";
import Beatloader from 'react-spinners/BeatLoader'
import freedomImg from "../Assets/Img/freedom.jpg"
import { FaLaptopCode } from "react-icons/fa";

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
                        <h1 className=" font-bold text-2xl tracking-wide text-dark-gray">Hello!</h1>
                        <p className=" text-sm tracking-wide text-dark-gray">Create your account.</p>
                    </div>
                    <form onSubmit={create}>
                        <div className=" flex flex-col gap-3 sm:gap-4">
                            <Input label="Username" error={errors.username} type="text" placeholder="Create unique username" value={data.username} onChange={e => setData('username', e.target.value)} />
                            <Input label="Email Address" error={errors.email} type="email" placeholder="example@email.com" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <Input label="Password" error={errors.password} type="password" placeholder="Minimum of 8 character" value={data.password} onChange={e => setData('password', e.target.value)} />
                            <Input label="Retype Password" error={errors.retypePassword} type="password" placeholder="Minimum of 8 character" value={data.retypePassword} onChange={e => setData('retypePassword', e.target.value)} />
                            <div className=" flex items-center justify-end">
                                <button disabled={processing} type="submit" className="w-full h-9 flex items-center justify-center font-bold bg-yellow-light py-2 text-sm rounded px-3 text-light tracking-wide">
                                    {processing ? null : 'Signup'}
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
                        <p className=" text-xs text-right tracking-wide mt-2">Already have a account? <Link href="/login" className="hover:underline">Signin</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register;