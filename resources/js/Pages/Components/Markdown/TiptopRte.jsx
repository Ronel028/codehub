import { BubbleMenu, FloatingMenu, EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from '@tiptap/starter-kit'
import { all, createLowlight } from "lowlight";
import { debounce } from "lodash";
import { FaBold, FaItalic, FaStrikethrough, FaListOl, FaCode, FaImage } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import Image from "@tiptap/extension-image";
import { useCallback, useRef } from "react";

const lowlight = createLowlight(all)

const debounceOnChange = debounce((editor, data, setData) => {
    let value = editor.getHTML()
    if (!('content' in editor.getJSON().content[0])) {
        value = value.replace(/<p>\s*<\/p>/g, '')
    }
    setData({
        ...data,
        content: value
    })
}, 2300)

const TiptopRte = ({ data, setData, getImage }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({
                lowlight
            }),
            Placeholder.configure({
                placeholder:
                    'Write something … It’ll be shared with everyone else looking at this example.',
            }),
            Image.configure({
                allowBase64: true
            })
        ],
        content: data.content,
        onUpdate: ({ editor }) => {
            debounceOnChange(editor, data, setData)
        }
    })

    const addImage = useCallback((e) => {
        // const url = window.prompt('URL')
        // console.log(url)
        // if (url) {
        //   editor.chain().focus().setImage({ src: url }).run()
        // }
        // console.log(editor.commands.setImage({ src: 'https://images.pexels.com/photos/6153739/pexels-photo-6153739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }))
        getImage(editor.commands)
    }, [editor])

    // const getImage = useCallback((e) => {
    //     console.log(e)
    //     if (e.target.files && e.target.files[0]) {
    //         const image = e.target.files[0];
    //         if (image.size > 1000000) {
    //             toast.error(
    //                 "File size exceed the maximum limit for 1mb, Please try upload another image.",
    //                 {
    //                     position: "top-right",
    //                     autoClose: 10000,
    //                 }
    //             );
    //             return;
    //         }
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             editor.chain().focus().setImage({ src: e.target.result }).run()
    //         };
    //         reader.readAsDataURL(image);
    //         e.target.value = "";
    //     }
    // }, [editor])

    return (
        <>
            {
                editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="bubble-menu bg-light text-primary rounded p-1 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${editor.isActive('bold') ? 'bg-light-gray' : ''} text-sm text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaBold />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${editor.isActive('italic') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaItalic />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${editor.isActive('strike') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaStrikethrough />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            className={`${editor.isActive('code') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaCode />
                        </button>
                    </div>
                </BubbleMenu>
            }
            {
                editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100, zIndex: 10 }}>
                    <div className="floating-menu bg-light text-primary rounded p-1 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`${editor.isActive('heading', { level: 3 }) ? 'bg-light-gray' : ''} text-sm text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            h3
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            className={`${editor.isActive('heading', { level: 4 }) ? 'bg-light-gray' : ''} text-sm text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            h4
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`${editor.isActive('orderedList') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaListOl />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`${editor.isActive('bulletList') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <MdFormatListBulleted className=" text-lg" />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`${editor.isActive('codeBlock') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaCode />
                        </button>
                        <button
                            type="button"
                            onClick={addImage}
                            className={` text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaImage />
                        </button>
                    </div>
                </FloatingMenu>
            }
            <EditorContent editor={editor} />
        </>
    )
}

export default TiptopRte