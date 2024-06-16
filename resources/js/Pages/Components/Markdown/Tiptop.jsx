import { EditorProvider, useCurrentEditor, FloatingMenu, BubbleMenu } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/react'

const extensions = [
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
                2: 'text-2xl',
            }
            return [
                `h${level}`,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                    class: `${classes[level]}`,
                }),
                0,
            ]
        },
    })
]

const content = '<p>Hello World!</p>'

const MenuBar = () => {
    const { editor } = useCurrentEditor()
  
    if (!editor) {
      return null
    }
  
    return (
      <div className="control-group">
        <div className="button-group">
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
            className={editor.isActive('bold') ? 'bg-secondary text-light' : ''}
          >
            Bold
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
            className={editor.isActive('italic') ? 'bg-secondary text-light' : ''}
          >
            Italic
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
            className={editor.isActive('strike') ? 'bg-secondary text-light' : ''}
          >
            Strike
          </button>
          <button
           type='button'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'bg-secondary text-light' : ''}
          >
            Code
          </button>
          <button  type='button' onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </button>
          <button  type='button' onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'bg-secondary text-light' : ''}
          >
            Paragraph
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary text-light' : ''}
          >
            H1
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-light' : ''}
          >
            H2
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary text-light' : ''}
          >
            H3
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'bg-secondary text-light' : ''}
          >
            H4
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'bg-secondary text-light' : ''}
          >
            H5
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'bg-secondary text-light' : ''}
          >
            H6
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-secondary text-light' : ''}
          >
            Bullet list
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-secondary text-light' : ''}
          >
            Ordered list
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-secondary text-light' : ''}
          >
            Code block
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-secondary text-light' : ''}
          >
            Blockquote
          </button>
          <button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            Horizontal rule
          </button>
          <button type='button' onClick={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </button>
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
            Undo
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
          >
            Redo
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-secondary text-light' : ''}
          >
            Purple
          </button>
        </div>
      </div>
    )
  }

const Tiptap = () => {
  return (
    <EditorProvider 
        extensions={extensions} 
        content={content}
        slotBefore={<MenuBar />}
    >
    </EditorProvider>
  )
}

export default Tiptap