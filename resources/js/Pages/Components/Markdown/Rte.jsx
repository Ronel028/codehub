import { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill';
import "../../../../css/rte-editor.css"
import 'react-quill/dist/quill.snow.css';
import "../../../../css/code.css"

const toolbarOptions = {
    syntax: true,
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
    ]
}

const RteEditor = (props) => {
  

  useEffect(() => {
    hljs.initHighlightingOnLoad()
  }, [])

  return (
    <>
      <div className={`${props.error ? 'border-red-500 border rounded-md p-1' : ''}`}>
        <ReactQuill 
          theme='snow' 
          value={props.rteValue} 
          onChange={(e) => props.setRteValue('content', e)} 
          placeholder='Write your blog content here...' 
          modules={toolbarOptions} 
        />
      </div>
      {props.error && <p className=" text-xs text-red-500">{props.error}</p>}
    </>
  ) 
}
export default RteEditor;