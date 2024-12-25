import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { FaCameraRetro, FaCamera, FaMinusCircle } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import altImage from "../Assets/Img/cypher.jpg"
import Input from "../Components/Forms/Input";
import MainLayout from "../../layout/main";
import Button from "../Components/Forms/Button";

const Edit = (props) => {

    const [loading, setLoading] = useState(false)
    const [datas, setDatas] = useState({
        image: null,
        username: props.user.username,
        email: props.user.email,
        password: '',
        first_name: (props.user.user_detail && props.user.user_detail.first_name) ?? '',
        middle_name: (props.user.user_detail && props.user.user_detail.middle_name) ?? '',
        last_name: (props.user.user_detail && props.user.user_detail.last_name) ?? '',
        address: (props.user.user_detail && props.user.user_detail.address) ?? '',
        experience: (props.user.user_detail && props.user.user_detail.experiences) ?? [''],
        soc_fb: (props.user.user_detail && props.user.user_detail.soc_fb) ?? '',
        soc_linkedin: (props.user.user_detail && props.user.user_detail.soc_linkedin) ?? '',
        soc_twitter: (props.user.user_detail && props.user.user_detail.soc_twitter) ?? '',
        about: (props.user.user_detail && props.user.user_detail.about) ?? ''
    })
    const [imagePreview, setImagePreview] = useState((props.user.upload && props.user.upload.path) ?? null)

    // ADD INPUT FIELD FOR EXPERIENCE
    const addExperience = () => {
        setDatas({
            ...datas,
            experience: [...datas.experience, ''],
        })
    }

    // ADD VALUE TO THE EXPERIENCE
    const addExp = (index, value) => {
        const updatedExperience = [...datas.experience];
        updatedExperience[index] = value;
        setDatas({
            ...datas,
            experience: updatedExperience
        });
    };

    // GET ALL THE VALUE OF INPUT
    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
    }

    // HANDLE IMAGE PREVIEW
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setDatas({
                ...datas,
                image: event.target.files[0]
            })
        }
    }

    // REMOVE EXPERIENCE LIST
    const removeExperience = (index) => {
        datas.experience.splice(index, 1)
        setDatas({
            ...datas,
            experience: datas.experience
        })
    }

    const store = () => {
        console.log(datas);

        router.post('/profile/store', datas, {
            onSuccess: () => {
                toast.success('Profile updated successfully')
            },
            onStart: () => {
                setLoading(true)
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    }

    return (
        <>
            <MainLayout>
                <div className=" pt-2">
                    <h1 className=" font-bold text-xl mb-5">Edit profile</h1>
                </div>
                <main className=" grid grid-cols-[40%_59%] gap-[1%]">
                    <div className=" ">
                        <div className="pt-5 pb-10 px-3 rounded-md border border-[#0D1B2A]">
                            <h4 className=" font-bold text-base mb-7">Account Details</h4>
                            <div>
                                <div className=" flex flex-col items-center justify-center">
                                    <div className=" relative rounded-full inline-block mb-5">
                                        <input id="upload" type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                                        <div className=" w-32 h-32 overflow-hidden rounded-full shadow-md ">
                                            {
                                                imagePreview === null ? <img className="h-full w-full object-cover" src={altImage} alt="image-placeholder" />
                                                    : <img className="h-full w-full object-cover" src={imagePreview} alt="" />
                                            }

                                        </div>
                                        <label htmlFor="upload" className=" bg-secondary shadow p-2 rounded-full cursor-pointer inline-block absolute bottom-0 right-2">
                                            <div className="">
                                                <FaCamera className=" fill-white text-base" />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className=" px-10 flex flex-col gap-3">
                                    <Input name="username" type="text" label="Username" value={datas.username} onChange={handleChange} />
                                    <Input name="email" type="email" label="Email address" value={datas.email} onChange={handleChange} />
                                    <Input name="password" type="password" label="Password" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" py-5 px-3 rounded-md border border-[#0D1B2A]">
                        <div>
                            <div className="">
                                <h4 className=" font-bold text-base mb-7">Personal Information</h4>
                                <div className=" grid grid-cols-3 gap-2 mb-5">
                                    <Input label="First Name" name="first_name" value={datas.first_name} onChange={handleChange} />
                                    <Input label="Middle Name(Optional)" name="middle_name" value={datas.middle_name} onChange={handleChange} />
                                    <Input label="Last Name" name="last_name" value={datas.last_name} onChange={handleChange} />
                                </div>
                                <div className=" mb-5">
                                    <Input label="Address" name="address" value={datas.address} onChange={handleChange} />
                                </div>
                                <div>
                                    <div className=" flex items-center justify-between mb-1">
                                        <h4 className=" text-sm">Experience</h4>
                                        <button type="button" onClick={addExperience} className=" bg-secondary p-[2px] rounded-md">
                                            <IoIosAdd className=" fill-white" />
                                        </button>
                                    </div>
                                    <div className=" mb-5">
                                        {
                                            datas.experience.map((data, index) => {
                                                return (
                                                    <div key={index} className=" mb-2 relative">
                                                        <Input name={`exp_${index}`} value={data} onChange={(e) => addExp(index, e.target.value)} />
                                                        <button onClick={() => removeExperience(index)} className=" absolute right-2 top-1/2 transform -translate-y-1/2">
                                                            <FaMinusCircle className=" fill-red-700" />
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h4 className=" text-sm">Social Media Links(Optional)</h4>
                                    <div className=" grid grid-cols-3 gap-2 mb-5">
                                        <Input placeholder="Facebook" name="soc_fb" value={datas.soc_fb} onChange={handleChange} />
                                        <Input placeholder="Linkedin" name="soc_linkedin" value={datas.soc_linkedin} onChange={handleChange} />
                                        <Input placeholder="Twitter" name="soc_twitter" value={datas.soc_twitter} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className=" text-sm">About</h4>
                                    <div className=" mb-5">
                                        <textarea rows={6} name="about" value={datas.about} onChange={handleChange} placeholder="Tell something about yourself..." id="" className={`w-full border border-[#415A77] focus:outline-[#778DA9] bg-[#0D1B2A] outline-none p-2 text-xs rounded-md`}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className=" border-t border-light-gray pt-2 mb-5">
                                <h4 className=" text-lg font-bold">Delete your account?</h4>
                                <p className=" text-xs mb-2">Deleting your account will remove your access. This action cannot be undone.</p>
                                <button className=" border border-red-300 hover:bg-red-300 hover:text-secondary transition-colors ease-linear duration-150 font-bold tracking-wide rounded-md px-3 py-2 text-xs text-red-300">
                                    Delete your account
                                </button>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <Link href="/" className=" border border-[#415A77] hover:bg-[#415A77] transition-colors ease-linear duration-150 rounded-md text-xs px-3 py-2 text-[#E0E1DD]">
                                    Back
                                </Link>
                                <Button event={store} loading={loading}>Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    )
}

export default Edit;