import { useRef, useState } from "react";
import { router } from "@inertiajs/react";
import Cropper from "react-cropper";
import { isNull } from "lodash";
import { filesize } from "filesize";
import Beatloader from 'react-spinners/BeatLoader'
import { convertBytes, dataURLtoFile } from "../../../utils/functions";
import "cropperjs/dist/cropper.css";

const ChangePhotoModal = ({ photo, setPhoto, type, aspectRatio, title }) => {

    const cropperRef = useRef(null);
    const [cropImage, setCropImage] = useState(null)
    const [cropImageFinalPreview, setCropImageFinalPreview] = useState(null)
    const [cropImageFinal, setCropImageFinal] = useState(null)
    const [photoSize, setPhotoSize] = useState(null)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)

    function onCrop(){
        const cropper = cropperRef.current?.cropper;
        const cropImage = cropper.getCroppedCanvas().toDataURL()
        const cropFileSize = convertBytes(cropImage)
        setCropImage(cropImage);
        setPhotoSize(cropFileSize)
    };

    function crop(){
        if(!isNull(cropImage)){
            setError(null)
            const base64ToFileObject = dataURLtoFile(cropImage)
            setCropImageFinal(base64ToFileObject)
            setCropImageFinalPreview(cropImage)
        }
    }

    function resetState(){
        setPhoto(null)
        setCropImage(null);
        setCropImageFinal(null)
        setCropImageFinalPreview(null)
        setError(null)
        setProcessing(false)
    }

    function cropAgain(){
        setCropImageFinalPreview(null)
        setError(null)
    }

    function save(){
        router.post('/author/profile/edit/user-photo/save', { type: type, photo: cropImageFinal }, {
            onSuccess: () => {
                console.log('Profile photo saved.')
                resetState()
            },
            onError: (error) => {
                setError(error)
                setProcessing(false)
            },
            onProgress: () => {
                setProcessing(true)
            }
        })
    }

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className=" flex items-center justify-between gap-2">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                                        <p className=" text-secondary text-sm">
                                            Crop filesize: 
                                            <span 
                                                className={`${photoSize > 1000000 ? 'text-red-500' : 'text-green-500'} ml-1 font-bold`}>{ filesize(photoSize, {standard: "jedec"}) }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        {
                                            isNull(cropImageFinalPreview) ? (
                                                <Cropper
                                                    src={photo}
                                                    style={{ height: 300, width: "100%" }}
                                                    initialAspectRatio={aspectRatio}
                                                    aspectRatio={aspectRatio}
                                                    guides={false}
                                                    viewMode={1}
                                                    crop={onCrop}
                                                    ref={cropperRef}
                                                    />
                                            ) : (
                                                <div className=" w-full flex items-center justify-center">
                                                    <img src={cropImageFinalPreview} alt="" className={` aspect-[${aspectRatio}]`} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <p className="mt-1 text-sm text-red-500 font-bold">{error?.photo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <button disabled={processing} onClick={resetState} type="button" className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">Close</button>
                            {
                                isNull(cropImageFinalPreview) ? (
                                    <button
                                        onClick={crop}
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center rounded-md bg-green-500 h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                                    >
                                        Crop
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={cropAgain}
                                            disabled={processing}
                                            type="button"
                                            className={`inline-flex w-full items-center justify-center rounded-md bg-green-500 h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                                        >
                                            Crop Again
                                        </button>
                                        <button onClick={save} disabled={processing} type="button" className="inline-flex w-full min-w-[78.38px] h-9 items-center justify-center rounded bg-yellow-light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:w-auto">
                                            {processing ? null : "Save"}
                                            <Beatloader
                                                color={'#F9F9F9'}
                                                loading={processing}
                                                size={7}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePhotoModal