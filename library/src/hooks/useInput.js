import { useEffect, useState } from "react";
import { REGEX } from "../constants/regex";
// 외부에서 키값 넘겨줌. userName(username) ...
export const useInput = (property) => {
  const [ value, setValue ] = useState("");
  const [ message, setMessage ] = useState(null); 

  // handleOnChange할때마다(value바뀔때마다)
  useEffect(() => {
    // if(value.length === 0) {

    // }
    if(!value) {
      setMessage(() => null);
      console.log(value);
      return;
    }// 입력한 값이 비어있으면 메시지도 null 리턴
  

    const regexEntries = Object.entries(REGEX);
    for(let [k, v] of regexEntries) {
      if(property === k) { // 키값이 동일하면
        if(v.regexr.test(value)) { // 통과  정규식 검사/ 값
          setMessage(message => {
            return {
              type: "success",
              text: ""
            }
          })

        }else {
          setMessage(() => {
            return {
              type: "error",
              text: v.text
            }
        })
        }
      }
    }
  }, [value])
  
  const handleOnChange = (e) => {
    setValue(() => e.target.value);
  }

  return [ value, handleOnChange, message, setValue, setMessage ]
} 