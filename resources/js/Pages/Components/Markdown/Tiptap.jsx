import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import {common, createLowlight} from 'lowlight'
import StarterKit from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/react'
import { Extension } from '@tiptap/react'

import { FaBold, FaItalic, FaStrikethrough, FaParagraph, FaListUl, FaListOl, FaQuoteLeft, FaImage, FaLink, FaVideo, FaExpandArrowsAlt  } from "react-icons/fa";
import { BiCodeBlock, BiUndo, BiRedo  } from "react-icons/bi";
import Placeholder from '@tiptap/extension-placeholder'

const lowlight = createLowlight(common)

const MenuBar = ({ editor }) => {
  const [openHeading, setOpenHeading] = useState(false)

  const openHeadingMenu = () => {
    setOpenHeading(prevState => ! prevState)
  } 

  // handle image
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

  // HANDLE LINK
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
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  // youtube video
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      })
    }
  }

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
            <ul className={`${openHeading ? 'block' : 'hidden'} absolute z-[60]  border border-[#415A77] bg-[#1B263B] rounded-md mt-1 shadow w-[130px]`}>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${editor.isActive('heading', { level: 2 }) ? 'bg-[#415A77] text-[#E0E1DD]' : ''} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`}
                  >
                    Heading 2
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${editor.isActive('heading', { level: 3 }) ? 'bg-[#415A77] text-[#E0E1DD]' : ''} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`}
                  >
                    Heading 3
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  className={`${editor.isActive('heading', { level: 4 }) ? 'bg-[#415A77] text-[#E0E1DD]' : ''} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`}
                >
                  Heading 4
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`${editor.isActive('heading', { level: 5 }) ? 'bg-[#415A77] text-[#E0E1DD]' : ''} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`}
                  >
                    Heading 5
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                  className={`${editor.isActive('heading', { level: 6 }) ? 'bg-[#415A77] text-[#E0E1DD]' : ''} py-1 px-2 text-left hover:bg-[#415A77] hover:text-light w-full`}
                >
                  Heading 6
                </button>
              </li>
            </ul>
          </div>
          <button
            type='button'
            title='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`${editor.isActive('bold') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaBold className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`${editor.isActive('italic') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaItalic className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Strike'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={`${editor.isActive('strike') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaStrikethrough className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Paragraph'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${editor.isActive('paragraph') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaParagraph className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Bullet List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive('bulletList') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaListUl className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Order List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive('orderedList') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaListOl className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Code Block'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${editor.isActive('codeBlock') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <BiCodeBlock className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
            type='button'
            title='Qoute'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${editor.isActive('blockquote') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
          >
            <FaQuoteLeft className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <button
              type='button'
              title='Link'
              onClick={setLink}
              className={`${editor.isActive('blockquote') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
            >
            <FaLink  className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
          <label
            htmlFor='image'
            title='Image'
            className={`p-1 rounded cursor-pointer`}
          >
            <input type="file" hidden id="image" onChange={handleFileChange} />
            <FaImage />
          </label>
          <button
              type='button'
              title='Video'
              onClick={addYoutubeVideo}
              className={`${editor.isActive('blockquote') ? 'bg-[#415A77] text-[#E0E1DD] group' : ''} p-1 rounded`}
            >
            <FaVideo   className="group-[.bg-secondary]:fill-light text-sm" />
          </button>
        </div>
        <div className=' flex items-center gap-2'>
          <button
            type='button'
            title='Undo'
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
              title='Redo'
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
  const editorRef = useRef(null)
  const [height, setHeight] = useState(null)
  const [value, setValue] = useState(props.rteValue)
  const [expandEditor, setExpandEditor] = useState(false)

  const extensions = useMemo(() => {
    return [
        StarterKit.configure({
            heading: false,
            codeBlock: false,
        }),
        Heading.configure({ levels: [1, 2] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level) 
                ? node.attrs.level 
                : this.options.levels[0]
                const classes = {
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
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Link.configure({
          autolink: true,
          openOnClick: true,
          defaultProtocol: 'https',
          HTMLAttributes: {
            class: 'cursor-pointer text-blue-500 hover:underline'
          }
        }),
        CodeBlockLowlight.configure({
          lowlight,
          HTMLAttributes: {
            class: "rounded-md"
          }
        }),
        Youtube.configure({
          inline: false,
          width: 480,
          height: 320,
          nocookie: true,
          allowFullscreen: true,
          ccLanguage: 'es',
          disableKBcontrols: true,
          loop: true,
        }),
        Placeholder.configure({
          placeholder: 'Write your blog content here...',
          considerAnyAsEmpty: true
        }),
        Extension.create({
          onUpdate({ editor }) {
            let value = editor.getHTML()

            if (!('content' in editor.getJSON().content[0])) {
              value = value.replace(/<p>\s*<\/p>/g, '')
            }
            setValue(value)
          }
        })
    ]
  }, [])

  useEffect(() => {
    props.setRteValue === null ? null : props.setRteValue('content', value)
  }, [value])


  const editorExpand = () => {
    setExpandEditor(prevState => !prevState)
  }

  useEffect(() => {
    if (editorRef.current) {
      let size = (editorRef.current.clientHeight - 80) + 'px'
      expandEditor ? setHeight(size) : setHeight(`300px`);
    }
  }, [expandEditor]);

  const editor = useEditor({
    extensions: extensions,
    content: props.rteValue,
    editorProps: {
      attributes: {
        class: `${props.styleContainer == null ? `border-[#415A77] border` : props.styleContainer }`,
        style: `${props.styleContainer == null ? `height: ${height};` : props.styleContainer } `
      }
    },
    editable: props.editable == null ? true : false
  })

  useEffect(() => {
    if(editor){
      editor.setOptions({
        editorProps: {
          attributes: {
            class: `${props.styleContainer == null ? `border-[#415A77] border` : props.styleContainer }`,
            style: `${props.styleContainer == null ? `height: ${height};` : props.styleContainer } `
          }
        }
      })
    }
  }, [height])

  return (
      <>
        <div className={`${expandEditor ? 'absolute inset-0 z-[999] bg-[#415A77] bg-opacity-40 backdrop-blur-sm px-2 py-3' : '' }`}>
          <div ref={editorRef} className={` ${props.error && !expandEditor ? 'border border-red-500 p-2 rounded-md' : ''} ${expandEditor ? `bg-[#1B263B] p-2 rounded-md h-full` : ''}`}>
            
            {
              props.disableMenuBar ? null : (
                <div className=' flex items-center justify-end'>
                  <button title='Expand Editor' type='button' onClick={editorExpand}>
                    <FaExpandArrowsAlt />
                  </button>
                </div>
              )
            }
            { props.disableMenuBar ? null : <MenuBar editor={editor} /> }
            <EditorContent editor={editor}  />
            {(props.error && !expandEditor) && <p className=" text-xs text-red-500 mt-1">{props.error}</p>}
          </div>
        </div>
      </>
  )
}

export default Tiptap