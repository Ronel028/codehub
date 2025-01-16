// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link } from '@inertiajs/react';
import AuthorLayout from '../../../layout/AuthorLayout';
import Input from '../../../components/Forms/Input';
import CoverOne from '../../../assets/img/cover-01.png';
import userSix from '../../../assets/img/user-06.png';
import { MdAddPhotoAlternate, MdAdd } from "react-icons/md";
import { IoCameraOutline } from 'react-icons/io5';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

const EditProfile = () => {
  return (
    <>
    <div className="mx-auto max-w-270">
      {/* <Breadcrumb pageName="Settings" /> */}
      <h1 className=' text-primary font-bold text-2xl mb-2'>Edit Profile</h1>

      <div className="grid grid-cols-2 gap-4">
          {/* ================ LEFT SIDE =============== */}
          <div className=''>
            <div className=' bg-gray-200/80 rounded-md mb-3'>
              <div className=' relative'>
                <img src={CoverOne} alt="" className='w-full h-36 aspect-video rounded-t-md' />
                <label htmlFor='cover__photo' className='absolute top-3 right-3 flex items-center justify-center w-7 aspect-square text-primary border bg-gray-400 cursor-pointer rounded-full'>
                  <MdAddPhotoAlternate className=' text-lg' />
                </label>
                  <input type="file" id='cover__photo' hidden />
              </div>
              <div className=' -mt-14 px-4 relative'>
                <img src={userSix} alt="" className='w-20 rounded-full border-2 border-gray-200 aspect-square' />
              </div>
              <div className=' px-3 pb-4 mt-2'>
                <p className=' text-primary font-bold'>Your photo</p>
                <p className=' text-secondary text-xs'>This will be displayed in your profile</p>
                <div className='mt-2 flex items-center gap-2'>
                  <label htmlFor='profile__photo' className='cursor-pointer text-primary text-sm border border-gray-400 px-2 py-1 rounded-md'>Upload new</label>
                  <input type="file" id='profile__photo' hidden />
                  <button className=' text-very-light text-sm border border-primary bg-primary px-2 py-1 rounded-md'>Save</button>
                </div>
              </div>
            </div>
            <div className=' bg-gray-200/80 rounded-md px-3 py-3'>
              <p className=' text-primary text-lg font-bold'>Personal Information</p>
              <div className='mt-4 flex flex-col gap-5'>
                <Input label="Full name" />
                <Input label="Tagline" />
                <Input label="Address(Optional)" />
                {/* <div>
                  <button className=' text-very-light text-sm border border-primary bg-primary px-2 py-1 rounded-md'>Save</button>
                </div> */}
              </div>
            </div>
          </div>
          {/* ================ LEFT SIDE =============== */}

          {/* ================ RIGHT SIDE =============== */}
          <div>
            <div className=' bg-gray-200/80 rounded-md px-3 py-3 mb-3'>
                <p className=' text-primary text-lg font-bold'>BIO</p>
                <div className='mt-2 flex flex-col gap-5'>
                  <textarea rows={6} name="bio" id="" placeholder='Introduce your self...' className='border-light-gray focus:outline-[#778DA9] bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md'></textarea>
                </div>
              </div>
            <div className=' bg-gray-200/80 rounded-md px-3 py-3'>
              <p className=' text-primary text-lg font-bold font-nunito-sans'>Social Media Accounts</p>
              <div className='mt-2 flex flex-col gap-5'>
                <button className=' flex items-center justify-center text-primary text-sm border border-gray-300 bg-very-light px-3 py-2 rounded-md'>
                  <MdAdd className=' text-lg' />
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* ================ RIGHT SIDE =============== */}
      </div>
    </div>
  </>
  );
};

EditProfile.layout = page => <AuthorLayout children={page} />

export default EditProfile;
