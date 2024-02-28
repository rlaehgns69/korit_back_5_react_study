import { useState } from "react";

export function useInput() {
    const [ inputValue, setInputValue ] = useState("");

    const onChange = (e) => {
        const {value} = e.target;
        setInputValue(() => value);
  
    }
    return [inputValue, onChange];
}
// 유효성 검증 valid
/**
 * 
 * @param {*} maxSize 
 * @returns 
 */
export function useMaxSizeValidateInput(maxSize) {
    const [ inputValue, setInputValue ] = useState("");

    const onChange = (e) => {
        const {value} = e.target;
        if(value.length <= maxSize) {
          setInputValue(() => value);
        }
      }
    return [inputValue, onChange]; // 비구조  0번 1번
}