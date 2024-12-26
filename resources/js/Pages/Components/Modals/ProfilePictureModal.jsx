import { useRef, useState } from "react"
import { useForm } from "@inertiajs/react"
import { toast } from "react-toastify"
import { Cropper } from "react-cropper"
import BeatLoader from "react-spinners/BeatLoader"
import { dataURLtoFile } from "../../../utils/functions"

const ProfilePictureModal = ({ photo, setPhoto }) => {

    const cropperRef = useRef(null)
    const { data, setData, post, processing, errors } = useForm({
        photo: null
    })

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        const base64Image = cropper.getCroppedCanvas().toDataURL()
        const image = dataURLtoFile(base64Image)
        setData({
            ...data,
            photo: image
        })
    };

    const save = () => {
        post('/profile/change-profile-picture', {
            onSuccess: () => {
                toast.success('Profile updated.', {
                    position: 'top-right'
                })
                setPhoto(null)
            },
            onError: () => toast.error('Failed to change your profile')
        })
    }

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">Change Profile</h3>
                                    <div className="mt-2">
                                        <Cropper
                                            src={photo}
                                            style={{ height: 300, width: "100%" }}
                                            initialAspectRatio={1 / 1}
                                            aspectRatio={1 / 1}
                                            viewMode={1}
                                            guides={false}
                                            crop={onCrop}
                                            ref={cropperRef}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <button onClick={() => setPhoto(prevState => null)} type="button" className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">Close</button>
                            <button
                                onClick={save}
                                disabled={processing}
                                type="button"
                                className={`${processing ? 'bg-opacity-75' : null} inline-flex w-full items-center justify-center rounded-md bg-primary h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                            >
                                {processing ? null : 'Save'}
                                <BeatLoader
                                    color={'#B6BBC4'}
                                    loading={processing}
                                    size={7}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePictureModal