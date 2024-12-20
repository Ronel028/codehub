import { BubbleMenu, FloatingMenu, EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from '@tiptap/starter-kit'
import { all, createLowlight } from "lowlight";
import { debounce } from "lodash";
import { FaBold, FaItalic, FaStrikethrough, FaListOl, FaCode } from "react-icons/fa";
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

const TiptopRte = ({ data, setData }) => {

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
        ],
        content: data.content,
        onUpdate: ({ editor }) => {
            debounceOnChange(editor, data, setData)
        }
    })

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
                editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
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
                    </div>
                </FloatingMenu>
            }
            <EditorContent editor={editor} />
        </>
    )
}

export default TiptopRte