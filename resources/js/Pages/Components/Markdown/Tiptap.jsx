import { useState, useMemo } from 'react'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/react'
import { Extension } from '@tiptap/react'
import ImageResize from 'tiptap-imagresize'

import { FaBold, FaItalic, FaStrikethrough, FaParagraph, FaListUl, FaListOl, FaQuoteLeft, FaImage } from "react-icons/fa";
import { BiCodeBlock, BiUndo, BiRedo  } from "react-icons/bi";


const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const [openHeading, setOpenHeading] = useState(false)
  const [image, setImage] = useState(null)

  const openHeadingMenu = () => {
    setOpenHeading(prevState => ! prevState)
  } 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) {
    return null
  }
  
  return (
    <div className="mb-2">
      <div className="button-group flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <div className=' relative'>
            <button type='button' onClick={openHeadingMenu} className=' py-1 px-3 border border-secondary text-sm rounded-md'>
              Heading
            </button>
            <ul className={`${openHeading ? 'block' : 'hidden'} absolute bottom-8 border border-secondary bg-light rounded-md mt-1 shadow w-[130px]`}>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`${editor.isActive('heading', { level: 1 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 1
              </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 2
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${editor.isActive('heading', { level: 3 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 3
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  className={`${editor.isActive('heading', { level: 4 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 4
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`${editor.isActive('heading', { level: 5 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 5
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                  className={`${editor.isActive('heading', { level: 6 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 6
                </button>
              </li>
            </ul>
          </div>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`${editor.isActive('bold') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaBold className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`${editor.isActive('italic') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaItalic className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={`${editor.isActive('strike') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaStrikethrough className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${editor.isActive('paragraph') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaParagraph className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive('bulletList') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaListUl className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive('orderedList') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaListOl className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${editor.isActive('codeBlock') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <BiCodeBlock className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${editor.isActive('blockquote') ? 'bg-secondary text-light group' : ''} p-1 rounded`}
          >
            <FaQuoteLeft className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
            <label
              htmlFor='image'
              className={`p-1 rounded cursor-pointer`}
            >
              <input type="file" hidden id="image" onChange={handleFileChange} />
              <FaImage />
            </label>
        </div>
        <div className=' flex items-center gap-2'>
          <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            <BiUndo className=' text-lg' />
          </button>
          <button
              type='button'
              onClick={() => editor.chain().focus().redo().run()}
              disabled={
                !editor.can()
                  .chain()
                  .focus()
                  .redo()
                  .run()
              }
               className=' text-lg'
            >
            <BiRedo />
          </button>
        </div>
      </div>
    </div>
  )
}

const Tiptap = (props) => {

  const extensions = useMemo(() => {
    return [
        StarterKit.configure({
            heading: false
        }),
        Heading.configure({ levels: [1, 2] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level) 
                ? node.attrs.level 
                : this.options.levels[0]
                const classes = {
                    1: 'text-4xl',
                    2: 'text-3xl',
                    3: 'text-2xl',
                    4: 'text-xl',
                    5: 'text-lg',
                    6: 'text-base',
                }
                return [
                    `h${level}`,
                    mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                        class: `${classes[level]}`,
                    }),
                    0,
                ]
            },
        }),
        ImageResize.configure({
          inline: true,
          allowBase64: true,
        }),
        Extension.create({
          onUpdate({ editor }) {
            props.setRteValue('content', editor.getHTML())
          }
        })
    ]
  }, [])

  return (
    <EditorProvider 
        extensions={extensions}
        content={props.rteValue}
        slotBefore={<MenuBar />}
    >
    </EditorProvider>
  )
}

export default Tiptap