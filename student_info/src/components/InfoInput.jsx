import React, { useRef } from 'react';
// nameInputRef
// ref 예약어
function InfoInput({ name, onChange, value, placeholder, inputRef }) {
  // const inputRef = useRef();

  // console.log(inputRef.current.name);
  // querySelector한거 처럼 객체를 가져옴. e.target.name


  return(
      <input type="text"
          name = { name }
          onChange = { onChange } 
          value = { value } 
          placeholder ={ placeholder } 
          ref = {inputRef} 
      />
  );// 함수화
}

InfoInput.defaultPros = {
  ref:null
}

export default InfoInput;