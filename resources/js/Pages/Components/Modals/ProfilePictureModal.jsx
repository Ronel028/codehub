import { useRef, useState } from "react"
import { Cropper } from "react-cropper"
import { dataURLtoFile } from "../../../utils/functions"

const ProfilePictureModal = ({ photo, setPhoto }) => {

    const cropperRef = useRef(null)
    const [cropImage, setCropImage] = useState(null)

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCropImage(cropper.getCroppedCanvas().toDataURL());
    };

    const save = () => {
        const image = dataURLtoFile(cropImage)
        console.log(image)
    }

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={save} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Save</button>
                            <button onClick={() => setPhoto(prevState => null)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePictureModal