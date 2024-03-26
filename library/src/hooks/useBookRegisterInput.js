import { useState } from "react"

export const useBookRegisterInput = ( enterFn, ref) => {
  const [ value, setValue ] = useState("");
  // console.log(ref);

  const handleOnChange = (e) => {
    // console.log(e); 객체 들고옴.
    if (!!e.target) {
      setValue(() => e.target.value);
    } else {
      setValue(() => e.value);
    }
  }

  const handleOnKeyDown = (e) => {
    if(e.keyCode === 13) {
      enterFn(ref);
    }
  }

  return { value, handleOnChange, handleOnKeyDown, setValue};// 변수명 적기 귀찮다-객체로
}