import { useCallback } from "react";
import { BubbleMenu, FloatingMenu, EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from '@tiptap/starter-kit'
import { all, createLowlight } from "lowlight";
import { debounce } from "lodash";
import { FaBold, FaItalic, FaStrikethrough, FaListOl, FaCode, FaImage, FaLink, FaYoutube } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

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

const TiptopRte = ({ data, setData, editable=true, getImage }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                code: {
                    HTMLAttributes: {
                        class: 'text-sm'
                    }
                }
            }),
            CodeBlockLowlight.configure({
                HTMLAttributes: {
                    class: ' text-sm'
                },
                lowlight
            }),
            Placeholder.configure({
                placeholder:
                    'Write something … It’ll be shared with everyone else looking at this example.',
            }),
            ImageResize.configure({
                HTMLAttributes: {
                    class: 'border border-gray-light rounded-md shadow shadow-gray-light'
                },
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                HTMLAttributes: {
                    class: 'cursor-pointer text-blue-500 font-medium underline'
                },
                autolink: true,
                openOnClick: false,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
            }),
            Youtube.configure({
                inline: false,
                width: 480,
                height: 320,
                nocookie: true,
                allowFullscreen: true,
                ccLanguage: 'es',
                disableKBcontrols: true,
                loop: false,
            }),
        ],
        editable: editable,
        content: data.content,
        onUpdate: ({ editor }) => {
            debounceOnChange(editor, data, setData)
        }
    })

    const addImage = useCallback((e) => {
        getImage(editor.commands)
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
        return
        }
    
        // empty
        if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
        return
        }
    
        // update link
        try {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
        } catch (e) {
            alert(e.message)
        }
    }, [editor])

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
    
        if (url) {
          editor.commands.setYoutubeVideo({
            src: url,
          })
        }
      }

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
                        <button
                            type="button"
                            onClick={setLink}
                            className={`${editor.isActive('link') ? 'bg-light-gray' : ''} text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaLink />
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
                        <button
                            type="button"
                            onClick={addYoutubeVideo}
                            className={` text-sm italic text-primary hover:bg-light-gray  rounded p-1`}
                        >
                            <FaYoutube />
                        </button>
                    </div>
                </FloatingMenu>
            }
            <EditorContent editor={editor} />
        </>
    )
}

export default TiptopRte