/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';


const layout = css`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const textEditorLayout = css`
  width: 900px;
  height: 700px;

`;

function BoardEx() {
  // e = e.target.value
  // onChange때 event x value 형태
  // 데이터베이스 컬럼 태그로 불러오면 우리가 지정한대로 
  const handleQuillChange = (value) => {
    console.log(value);// p태그 실제로 p태그 형식
  }

  const modules = useMemo(() => ({ 
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  }), []); //중괄호로 시작 함수 호출 그래서 소괄호로 시작(함수정의)
  
  return (
    <div css={layout}>
      <div css={textEditorLayout}>
      <ReactQuill style={{
        height: "100%"
      }} onChange={handleQuillChange} modules={modules}/> 
    </div>
    </div>
  );
}

export default BoardEx;