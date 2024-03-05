/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { QUILL_MODULES } from "../../constants/quillModules";
import { useInput, useMaxSizeValidateInput } from "../../hooks/inputHook";
import { useQuillInput } from "../../hooks/quillhook";
import { useNavigate } from "react-router-dom"; //Routes Route Link useNavigate
import { useLoadList } from "../../hooks/boardListHook";

const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;//가운데정렬
  margin: 100px 120px;
  border: 1px solid #dbdbdb;
  padding: 50px 0px;
`;

const headerTitle = css`
  margin-bottom: 30px;
  text-align: center;
  font-size: 40px;
  font-weight: 700;
`;

const boardTitle = css`
  box-sizing: border-box;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #ccc;
  padding: 10px;
  width: 90%;
`;

const submitButton = css`
  box-sizing: border-box;
  margin-top: 50px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 90%;
  background-color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
  &:active {
    background-color: #eee;
  }
`

function BoardWrite() {
 
  // inputValue 상태 컴포넌트 말고 function 
  // 렌더링

      //매개변수로 값을 받아와서 리턴 useState 최적화 3가지 (effect->Memo, )(state->function)
      //setInputValue((v) => v + 1);//값을 직접건들이지않고 set
  
      // setInputValue((iv) => value.length < 20 ? value : iv);// set상태 참 거짓 상관없이 호출
      // set하면 virtual DDM 비교 같으면 냅두고 다르면 변함. 매번
      //setInputValue(inputValue + 1) 값 직접참조 선호하지 않는다.(렌더링 일어남)
  
      // if(value.length < 20) {//inputValue
      //     setInputValue(() => value );
      //return value // 세터 function 해당 값리턴 
         
      // }
  // 일련의 동작들을 custom Hook
  //const [a,b]= [1,2];
  const [ inputValue3, handleInputChange3 ] = useInput(); // 5개 만들어서 사용가능
  const [ inputValue2, handleInputChange2 ] = useInput();

  const navigate = useNavigate();
  const [ inputValue, handleInputChange ] = useMaxSizeValidateInput(20);
  const [ quillValue, handleQuillValueChange ] = useQuillInput();
  const { boardList, lastId } = useLoadList();



  const handleSubmitClick = () => {
    let newBoardList = [];
  // 보드 200개 생성후 한번에 set
    for(let i = 0; i< 203; i++){
        const board = {
            boardId: i + 1, // lastId에서 임시 i
            boardTitle: inputValue + (i + 1),
            boardContent: quillValue
        };

        newBoardList = [...newBoardList, board];
      }
    localStorage.setItem("boardList", JSON.stringify(newBoardList));// 로컬 덮어쓰기
    alert("글 작성 완료.");
    // 글 목록, view
    navigate("/board/list");
  }
    
    // window.location. href replace
    // window.location.replace(); // 절대 쓰지말자 
    // 리액트는 바닐라 js랑 다른구조 App에서 부터 다시 최상에 로그인 상태 상위 싹다 초기화
    // react-router-dom useNavigate Hook
    // recoli redux 전역 상태 바로접근 가능 
    // App안에 컴포넌트 안에 컴포넌트 App useState쓰려면 props

  

  return (
    <div css={layout}>
      <h1 css={headerTitle}>글 작성하기</h1>
      <input css={boardTitle} 
          type="text" 
          placeholder="제목을 입력하세요" 
          onChange={handleInputChange}
          value={inputValue} //상태
      />
      <ReactQuill style={{
          width: "90%",
          height: "400px"
          }} 
          modules={QUILL_MODULES}
          onChange={handleQuillValueChange}
       />
        <button css={submitButton} onClick={handleSubmitClick}>작성하기</button>
    </div>
  );
}

export default BoardWrite;