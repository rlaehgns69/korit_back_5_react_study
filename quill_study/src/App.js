import logo from './logo.svg';
import './App.css';
import ReactQuill  from 'react-quill';
import { useCallback, useState } from 'react';

function App() {

  const modules = {
    toolbar:[
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  };

  const [title, setTitle] = useState("");
  //const [ content, setContent ] = useState("");
let content="";

  const handleTitleChange = useCallback((e) => {
    setTitle(() => e.target.value);
  }, []);

  // const handleQuillChange =useCallback((value) => {
  //   setContent(() => value)
    // console.log(content);
  //   }, [])
  const handleQuillChange = useCallback((value) => {
    content=value;
    console.log(content);
  }, []);
  
//핸들러는 콜백에 잡아놓지 말자 프로그램 무거워진다.
  //console.log(content); //렌더링 input title의 상태 상태가바뀌면 App이 렌더링 content는 상태가 아님

  return (
    <>
      <input type="text" onChange={handleTitleChange} />
      <ReactQuill modules={modules} onChange={handleQuillChange} />
    </>
  );
}

export default App;
