import { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import Button from "../Forms/Button";
import { FiUploadCloud } from "react-icons/fi";
import { isNull } from "lodash";

const TiptopImageUploadModal = ({ command, setCommand }) => {

    const cropperRef = useRef(null)
    const [image, setImage] = useState(null)
    const [cropImage, setCropImage] = useState(null)

    function displayImg(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result)
            };
            reader.readAsDataURL(image);
            e.target.value = "";
        }
    }

     function onCrop(){
        const cropper = cropperRef.current?.cropper;
        const cropImage = cropper.getCroppedCanvas().toDataURL()
        setCropImage(cropImage);
    };

    function save(){
        if(!isNull(image)){
            command.setImage({ src: cropImage })
            setCommand(prevState => prevState = null)
            setCropImage(prevState => prevState = null)
            setImage(prevState => prevState = null)
        }
    }

    function close(){
        setCommand(prevState => prevState = null)
        setCropImage(prevState => prevState = null)
        setImage(prevState => prevState = null)
    }

    return (
        <div className={` relative z-50`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className=" flex items-center justify-between gap-2">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Upload Image</h3>
                                        {/* <p className=" text-secondary text-sm">
                                            Crop filesize: 
                                            <span 
                                                className={`${photoSize > 1000000 ? 'text-red-500' : 'text-green-500'} ml-1 font-bold`}>{ filesize(photoSize, {standard: "jedec"}) }
                                            </span>
                                        </p> */}
                                    </div>
                                    {
                                        isNull(image) ? (
                                            <div className={` mt-4`}>
                                                <label htmlFor="tiptopImage" className={`border-meduim-gray text-meduim-gray text-sm cursor-pointer  flex flex-col items-center justify-center h-28 border border-dashed rounded-md`}>
                                                    <FiUploadCloud className=" text-2xl mb-1" />
                                                    Click to upload Image.
                                                </label>
                                                <input onChange={displayImg} type="file" accept=".png,.jpg,.jpeg,.webp" hidden id="tiptopImage" name="tiptopImage" />
                                            </div>
                                        ) : (
                                            <Cropper
                                                src={image}
                                                style={{ height: 300, width: "100%" }}
                                                initialAspectRatio={1/1}
                                                guides={false}
                                                viewMode={1}
                                                crop={onCrop}
                                                ref={cropperRef}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <Button onClick={close} variant="outlined" title={'Close'} />
                            <Button onClick={save} title={'Save'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TiptopImageUploadModal