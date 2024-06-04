import { Link } from "@inertiajs/react";
import { FaCameraRetro, FaCamera  } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Input from "../Components/Forms/Input";
import MainLayout from "../../layout/main";

const Edit = () => {
    return (
        <>
            <MainLayout>
                <div className=" pt-2">
                    <h1 className=" font-bold text-xl mb-5">Edit profile</h1>
                </div>
                <main className=" grid grid-cols-[40%_59%] gap-[1%]">
                    <div className=" pt-5 pb-10 px-3 shadow">
                        <h4 className=" font-bold text-sm mb-7">Account Details</h4>
                        <div>
                            <div className=" flex flex-col items-center justify-center">
                                <div className=" relative rounded-full inline-block mb-5">
                                    <input id="upload" type="file" className="hidden" accept="image/*" />
                                    <div className=" w-32 h-32 overflow-hidden rounded-full shadow-md ">
                                        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80" alt="" />
                                    </div>
                                    <label htmlFor="upload" className=" bg-secondary shadow p-2 rounded-full cursor-pointer inline-block absolute bottom-0 right-2">
                                        <div className="">
                                            <FaCamera  className=" fill-white text-base" />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className=" px-10 flex flex-col gap-3">
                                <Input type="text" label="Username" />
                                <Input type="email" label="Email address" />
                                <Input type="password" label="Password" />
                            </div>
                        </div>
                    </div>
                    <div className=" py-5 px-3 shadow">
                        <form>
                            <div className="">
                                <h4 className=" font-bold text-sm mb-7">Personal Information</h4>
                                <div className=" grid grid-cols-3 gap-2 mb-5">
                                    <Input label="First Name" />
                                    <Input label="Middle Name(Optional)" />
                                    <Input label="Last Name" />
                                </div>
                                <div className=" mb-5">
                                    <Input label="Address" />
                                </div>
                                <div>
                                    <div className=" flex items-center justify-between mb-1">
                                        <h4 className=" text-sm">Experience</h4>
                                        <button className=" bg-secondary p-[2px] rounded-md">
                                            <IoIosAdd className=" fill-white" />
                                        </button>
                                    </div>
                                    <div className=" mb-5">
                                        <Input  />
                                    </div>
                                </div>
                                <div>
                                    <h4 className=" text-sm">Social Media Links</h4>
                                    <div className=" grid grid-cols-3 gap-2 mb-5">
                                        <Input placeholder="Facebook" />
                                        <Input placeholder="Linkedin" />
                                        <Input placeholder="Twitter" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className=" text-sm">About</h4>
                                    <div className=" mb-5">
                                        <textarea rows={6} placeholder="Tell something about yourself..." name="" id="" className={`w-full border border-light-gray focus:outline-primary outline-none p-2 text-xs rounded-md`}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className=" border-t border-light-gray pt-2 mb-5">
                                <h4 className=" text-lg font-bold">Delete your account?</h4>
                                <p className=" text-xs mb-2">Deleting your account will remove your access. This action cannot be undone.</p>
                                <button className=" border border-red-600 rounded-md px-3 py-2 text-xs text-red-600">
                                    Delete your account
                                </button>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <Link href="/" className=" border border-primary rounded-md px-3 py-2 text-xs text-primary">
                                   Back
                                </Link>
                                <button className=" border border-primary bg-primary rounded-md px-3 py-2 text-xs text-gray-100">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </MainLayout>
        </>
    )
}

export default Edit;