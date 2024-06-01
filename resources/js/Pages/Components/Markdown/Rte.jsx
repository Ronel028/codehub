import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import "../../../../css/rte-editor.css"
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = {
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
  
  return (
    <>
      <div>
        <ReactQuill theme='snow' value={props.rteValue} onChange={props.setRteValue} placeholder='Write your blog content here...' modules={toolbarOptions} />
      </div>
    </>
  ) 
}
export default RteEditor;