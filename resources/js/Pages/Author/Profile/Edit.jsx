import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthorLayout from '../../../layout/AuthorLayout';
import Input from '../../../components/Forms/Input';
import CoverOne from '../../../assets/img/cover-01.png';
import userSix from '../../../assets/img/user-06.png';
import { MdAddPhotoAlternate, MdAdd } from "react-icons/md";
import { FaRegEdit, FaSave, FaTrashAlt } from 'react-icons/fa';
import { capitalize, isNull } from 'lodash';
import ChangeProfilePhotoModal from '../../../components/Author/Profile/ChangeProfileModal';
import { toast } from 'react-toastify';

const EditProfile = ({ socialMediaLinks, userDetail }) => {

  const [errors, setError] = useState(null)
  const [showAddSocialMediaModal, setShowAddSocialMediaModal] = useState(false)
  const [socialMediaLinkId, setSocialMediaLinkId] = useState({
    id: null,
    link: ''
  })
  const [personalInformationData, setPersonalInformationData] = useState({
    fullname: '',
    tagline: '',
    address: '',
    bio: ''
  })
  const [profilePhoto, setProfilePhoto] = useState(null)


  /* ============== SOCIAL MEDIA LINKS FUNCTIOS =============== */
  function addSocialMedia(name){
    if(name === 'show'){
      setShowAddSocialMediaModal(true)
    }else{
      setShowAddSocialMediaModal(false)
    }
  }
  function editSocialMediaLink(id, link) {
    setError(prevState => null)
    setSocialMediaLinkId({
      ...socialMediaLinkId,
      id: id,
      link: link
    })
  }
  function updateLinkValue(e){
    const name = e.target.name
    setSocialMediaLinkId({
      ...socialMediaLinkId,
      link: e.target.value
    })
  }
  function saveUpdatedSocialMediaLink(){
    router.post(`/author/profile/edit/social-media-account/update`, socialMediaLinkId, {
      onSuccess: () => {
        setSocialMediaLinkId({
          ...socialMediaLinkId,
          id: null,
          link: ''
        })
        setError(prevState => null)
      },
      onError: (error) => {
        setError(error)
      }
    })
  }
  function removeSocialMediaLink(id){
    router.delete(`/author/profile/edit/social-media-account/remove/${id}`)
  }
  /* ============== SOCIAL MEDIA LINKS FUNCTIOS =============== */

  /* ============== PERSONAL INFORMATION FUNCTIOS =============== */
  function onChangeGetPeronalInformation(e){
    setPersonalInformationData({
      ...personalInformationData,
      [e.target.name]: e.target.value
    })
  }
  function savePersonalInformation(){
    router.post('/author/profile/edit/personal-information/save', personalInformationData, {
      onSuccess: () => {
        console.log('Personal Information Saved.')
        setError(prevState => null)
      },
      onError: (error) => {
        setError(error)
      }
    })
  }
  /* ============== PERSONAL INFORMATIONS FUNCTIOS =============== */

  /* ============== PROFILE AND COVER PHOTO FUNCTIOS =============== */
  function handleOnChangeGetProfilePhoto(e){
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.size > 1000000) {
          toast.error('File size exceed the maximum limit for 1mb, Please try upload another image.', {
              position: 'top-right',
              autoClose: 10000,
          })
          return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(prevState => e.target.result)
      }
      reader.readAsDataURL(image)
      e.target.value = ''
  }
  }
  /* ============== PROFILE AND COVER PHOTO FUNCTIOS =============== */

  /* ============== REACT useEffect() FUNCTIONS ================ */
  useEffect(() => {
    if(!isNull(userDetail)){
      setPersonalInformationData({
        ...personalInformationData,
        fullname: userDetail.full_name ?? '',
        tagline: userDetail.tagline ?? '',
        address: userDetail.address ?? '',
        bio: userDetail.bio ?? ''
      })
    }
  }, [userDetail])
  /* ============== REACT useEffect() FUNCTIONS ================ */

  return (
    <>
    { isNull(profilePhoto) ? null : <ChangeProfilePhotoModal photo={profilePhoto} /> }
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
                  <input onChange={handleOnChangeGetProfilePhoto} type="file" id='profile__photo' hidden />
                  <button className=' text-very-light text-sm border border-primary bg-primary px-2 py-1 rounded-md'>Save</button>
                </div>
              </div>
            </div>
            <div className=' bg-gray-200/80 rounded-md px-3 py-3'>
              <p className=' text-primary text-lg font-bold'>Personal Information</p>
              <div className='mt-4 flex flex-col gap-5'>
                <Input onChange={onChangeGetPeronalInformation} value={personalInformationData.fullname} error={errors?.fullname} name="fullname" label="Full name" placeholder="Enter your full here" />
                <Input onChange={onChangeGetPeronalInformation} value={personalInformationData.tagline} error={errors?.tagline} name="tagline" label="Tagline" placeholder="Describe yourself in one line" />
                <Input onChange={onChangeGetPeronalInformation} value={personalInformationData.address} name="address" label="Address(Optional)" placeholder="Add your current location" />
                <div>
                  <label htmlFor='bio' className='  block text-sm text-primary tracking-wide'>Bio</label>
                  <div className=''>
                    <textarea 
                      onChange={onChangeGetPeronalInformation} 
                      value={personalInformationData.bio} 
                      name="bio" 
                      id="bio" 
                      rows={6} 
                      placeholder='Share your story...' 
                      className={`w-full border ${errors?.bio ? 'border-red-500 focus:outline-red-500' : 'border-light-gray focus:outline-[#778DA9]'} bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md`}
                    ></textarea>
                    {errors?.bio && <p className=" text-xs text-red-500 ">{errors?.bio}</p>}
                  </div>
                </div>
                <div className='flex items-center justify-end'>
                  <button onClick={savePersonalInformation} className=' text-very-light text-sm border border-primary bg-primary px-2 py-1 rounded-md'>Save</button>
                </div>
              </div>
            </div>
          </div>
          {/* ================ LEFT SIDE =============== */}

          {/* ================ RIGHT SIDE =============== */}
          <div>
            <div className=' bg-gray-200/80 rounded-md px-3 py-3'>
              <p className=' text-primary text-lg font-bold font-nunito-sans'>Social Media Accounts</p>
              <div className='mt-2 flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    {
                      socialMediaLinks.map(value => {
                        return (
                          <div key={value.id} className=' grid grid-cols-5 gap-2'>
                              <div className='p-2 bg-very-light rounded-md'>
                                <span className=' align-middle text-sm text-primary text-center'>{capitalize(value.platform)}</span>
                              </div>
                              <div className=' col-span-4 p-2 bg-very-light rounded-md flex items-center justify-between gap-3'>
                                {
                                  socialMediaLinkId.id === value.id ? (
                                    <Input onChange={updateLinkValue} value={socialMediaLinkId.link} error={errors?.link} name={`social_link_${value.id}`} className="w-full" />
                                  ) : <a href={value.link} target='_blank' className='text-sm text-blue-500 font-bold hover:underline'>{value.link}</a>
                                }
                                <div className=' flex items-center gap-2'>
                                  {
                                    socialMediaLinkId.id === value.id ? (
                                      <button onClick={saveUpdatedSocialMediaLink} title='Save' className=' text-green-500'>
                                        <FaSave />
                                      </button>
                                    ) : (
                                      <button onClick={() => editSocialMediaLink(value.id, value.link)} title='Edit' className=' text-blue-500'>
                                        <FaRegEdit />
                                      </button>
                                    )
                                  }
                                  <button onClick={() => removeSocialMediaLink(value.id)} title='Remove' className=' text-red-500'>
                                    <FaTrashAlt />
                                  </button>
                                </div>
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
