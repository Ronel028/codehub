import { createContext, useEffect, useState } from "react";
import { isNull } from "lodash";
import { dataURLtoFile } from "../utils/functions";
import { router, useForm } from "@inertiajs/react";

export const PostTitleCreationContext = createContext({})

const PostTitleCreationProvider = ({ children }) => {

    const {data, setData, post, processing, errors} = useForm({
        title: '',
        description: '',
        thumbnail: null
    })

    const [thumbnail, setThumbnail] = useState(null)

    function handleOnchage(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function handleOnChangeThumbnail(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            // if (image.size > 1000000) {
            //     toast.error(
            //         "File size exceed the maximum limit for 1mb, Please try upload another image.",
            //         {
            //             position: "top-right",
            //             autoClose: 10000,
            //         }
            //     );
            //     return;
            // }
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };
            reader.readAsDataURL(image);
            e.target.value = "";
        }
    }

    function save(type){
        post('/author/post/create-title', { ...data, type }, {
            onSuccess: () => {
                console.log('Profile photo saved.')
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
        <PostTitleCreationContext.Provider value={{ data, setData, thumbnail, setThumbnail, handleOnchage, handleOnChangeThumbnail , save, processing }}>
            { children }
        </PostTitleCreationContext.Provider>
    )
}

export default PostTitleCreationProvider