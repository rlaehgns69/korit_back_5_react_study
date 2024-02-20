import { useState } from "react";

function CounterInput({ setCount }) {

  const [ inputValue, setInputValue ] = useState("0");
  //input text는 항상 문자열이다.

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCount(parseInt(e.target.value));
  }

  return <input type = "text" onChange = { handleInputChange } value = { inputValue }/>;
}
export default CounterInput;