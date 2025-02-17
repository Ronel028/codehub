import { createContext, useEffect, useState } from "react";
import { isNull } from "lodash";
import { dataURLtoFile } from "../utils/functions";
import { router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export const PostTitleCreationContext = createContext({})

const PostTitleCreationProvider = ({ children }) => {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        description: '',
        thumbnail: null
    })
    const [thumbnail, setThumbnail] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal(){
        setIsModalOpen(true)
    }

    function closeModal(){
        router.get(window.location.pathname)
        setIsModalOpen(false)
    }

    function handleOnchage(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function handleOnChangeThumbnail(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            if (image.size > 1000000) {
                toast.error(
                    "File size exceed the maximum limit for 1mb, Please try upload another image.",
                    {
                        position: "top-right",
                        autoClose: 10000,
                    }
                );
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };
            reader.readAsDataURL(image);
            e.target.value = "";
        }
    }

    function save(e){
        e.preventDefault()
        post('/author/post/create-title', {
            onSuccess: () => {
                setData({
                    ...data,
                    title: '',
                    description: '',
                    thumbnail: null
                })
            },
        })
    }

    return (
        <PostTitleCreationContext.Provider value={{ 
            data, setData, errors, thumbnail, processing, setThumbnail, handleOnchage, handleOnChangeThumbnail , save, 
            openModal, closeModal, isModalOpen
        }}>
            { children }
        </PostTitleCreationContext.Provider>
    )
}

export default PostTitleCreationProvider