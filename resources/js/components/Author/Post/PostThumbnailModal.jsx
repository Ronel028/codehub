import { useContext, useRef, useState } from "react"
import { Cropper } from "react-cropper"
import { isNull } from "lodash";
import { PostTitleCreationContext } from "../../../context/PostCreationContext";
import Button from "../../Forms/Button";
import { dataURLtoFile } from "../../../utils/functions";

const PostThumbnailModal = ({ photo, setPhoto, type, aspectRatio, title }) => {

    const { data, setData, thumbnail, setThumbnail } = useContext(PostTitleCreationContext);
    const cropperRef = useRef(null)
    const [cropPhoto, setCropPhoto] = useState(null)

    function onCrop(){
        const cropper = cropperRef.current?.cropper;
        const cropImage = cropper.getCroppedCanvas().toDataURL()
        setCropPhoto(cropImage);
        // const cropFileSize = convertBytes(cropImage)
        // setPhotoSize(cropFileSize)
    };

    function saveCropPhoto(){
        const base64ToFileObject = dataURLtoFile(cropPhoto)
        setData({
            ...data,
            thumbnail: base64ToFileObject
        })
        setThumbnail(prevState => prevState = null)
        setCropPhoto(prevState => prevState = null)
    }

    return (
        <div className={`${isNull(thumbnail) ? 'hidden' : 'block'} relative z-50`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className=" flex items-center justify-between gap-2">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                                        {/* <p className=" text-secondary text-sm">
                                            Crop filesize: 
                                            <span 
                                                className={`${photoSize > 1000000 ? 'text-red-500' : 'text-green-500'} ml-1 font-bold`}>{ filesize(photoSize, {standard: "jedec"}) }
                                            </span>
                                        </p> */}
                                    </div>
                                    <div className="mt-4">
                                        <Cropper
                                            src={thumbnail}
                                            style={{ height: 300, width: "100%" }}
                                            initialAspectRatio={16/9}
                                            aspectRatio={16/9}
                                            guides={false}
                                            viewMode={1}
                                            crop={onCrop}
                                            ref={cropperRef}
                                            />
                                    </div>
                                    {/* <p className="mt-1 text-sm text-red-500 font-bold">{error?.photo}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <Button onClick={saveCropPhoto} title={'Crop'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostThumbnailModal