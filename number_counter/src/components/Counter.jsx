import { useState } from "react";
import CounterInput from "./CounterInput";
import CounterButton from "./CounterButton";

function Counter() {
  // const input = document.querySelector();
  // -리액트 이 형식 사용 x

  const [ number, setNumber ] = useState(0);
  const [ count, setCount ] = useState(0);
  //const number = 0;
  const handleOnIncrease = () => {
    setNumber(number + count);
  }

  const handleOnDecrease = () => {
    setNumber(number - count);
  }
  
  return(
    <>
      <h1>{ number }</h1>
      <CounterInput setCount = { setCount }/>
      <CounterButton title={ "-" } onClick={ handleOnDecrease }/>
      <CounterButton title={ "+" } onClick={ handleOnIncrease }/>
    </> //CounterButton의 onClick은 props aaa로 해도됨.(이름지정)
  )
}

export default Counter;