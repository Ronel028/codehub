// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthorLayout from '../../../layout/AuthorLayout';
import Input from '../../../components/Forms/Input';
import CoverOne from '../../../assets/img/cover-01.png';
import userSix from '../../../assets/img/user-06.png';
import { MdAddPhotoAlternate, MdAdd } from "react-icons/md";
import { IoCameraOutline } from 'react-icons/io5';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { capitalize } from 'lodash';

const EditProfile = ({ socialMediaLinks }) => {

  const [showAddSocialMediaModal, setShowAddSocialMediaModal] = useState(false)

  function addSocialMedia(name){
    if(name === 'show'){
      setShowAddSocialMediaModal(true)
    }else{
      setShowAddSocialMediaModal(false)
    }
  }

  console.log(socialMediaLinks)

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
                <div className='flex flex-col gap-2'>
                    {
                      socialMediaLinks.map(value => {
                        return (
                          <div key={value.id} className=' grid grid-cols-5 gap-2'>
                              <div className='p-2 bg-very-light rounded-md'>
                                <span className=' text-sm text-primary text-center'>{capitalize(value.platform)}</span>
                              </div>
                              <div className=' col-span-4 p-2 bg-very-light rounded-md'>
                                <a href={value.link} target='_blank' className='text-sm text-blue-500 font-bold hover:underline'>{value.link}</a>
                              </div>
                          </div>
                        )
                      })
                    }
                </div>
                <button onClick={() => addSocialMedia('show')} className=' flex items-center justify-center text-primary text-sm border border-gray-300 bg-very-light px-3 py-2 rounded-md'>
                  <MdAdd className=' text-lg' />
                  Add
                </button>
              </div>
            </div>
            { showAddSocialMediaModal ? <SocialMediaAccountModal addSocialMedia={addSocialMedia} /> : null }
          </div>
          {/* ================ RIGHT SIDE =============== */}
      </div>
    </div>
  </>
  );
};

const SocialMediaAccountModal =  ( { addSocialMedia } ) => {

  const { data, setData, post, processing, errors } = useForm({
    platform: '',
    link: '',
  })

  function handleOnChange(e){
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  function save(e){
    e.preventDefault()
    post('/author/profile/edit/social-media-account', {
      onSuccess: () => addSocialMedia('close')
    })
  }

  console.log(errors)

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <form onSubmit={save} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                              <h3 className="text-base font-semibold text-gray-900" id="modal-title">Social Media Account</h3>
                              <div className="mt-4">
                                <div className=''>
                                  <label htmlFor="platform" className='text-primary text-sm'>Platform</label>
                                  <div>
                                    <select onChange={handleOnChange} value={data.platform} name="platform" id="platform" className={`${errors.platform && 'focus:outline-red-500 border-red-500'} w-full border border-light-gray focus:outline-[#778DA9] bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md`}>
                                      <option value="" disabled>---Select Platform---</option>
                                      <option value="facebook">Facebook</option>
                                      <option value="twitter">Twitter</option>
                                      <option value="linkedin">Linkedin</option>
                                    </select>
                                    {errors.platform && <div className='mt-2 text-xs text-red-500'>{errors.platform}</div>}
                                  </div>
                                </div>
                                {
                                  data.platform.length > 0 ? (
                                    <div className='mt-3'>
                                        <Input onChange={handleOnChange} value={data.link} error={errors.link} required name="link" label="Link" placeholder="Enter your link..." />
                                    </div>
                                  ) : null
                                }
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                      <button onClick={() => addSocialMedia('close')} type="button" className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">Close</button>
                      <button
                          onClick={save}
                          disabled={processing}
                          type="button"
                          className={`inline-flex w-full items-center justify-center rounded-md bg-primary h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                      >
                          Save
                      </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
  )
}

EditProfile.layout = page => <AuthorLayout children={page} />

export default EditProfile;
