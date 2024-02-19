// import logo from './logo.svg';
// import './App.css';
// import { Fragment } from 'react';

import { useState } from "react";

/**
 * react component 특징
 * 1. 파일명과 함수명을 일치시킨다.
 * 2. 하나의 컴포넌트 함수는 하나의 태그 묶음만 리턴할 수 있다.
 * 3. 함수를 꼭 export 해야한다.
 */
export default function App() {
  let names = ["김준일", "김준이", "김준삼"];
  //const names = [<h1>김준일</h1>, "김준이", "김준삼"];
  // {<h1>김준일</h1>, <h1>김준이</h1>, <h1>김준삼</h1>}
  //const jsxNames = names.map(name => <h1>{ name }</h1>);
  //const nameArrayState = useState(["김준일", "김준이", "김준삼"]); 원래는 배열
  const [ nameArrayState, setNameArrayState ] = useState(["김준일", "김준이", "김준삼"]);
 // const [nameArrayState, setNameArrayState] = useState(["김준일", "김준이", "김준삼"]);
  // 비구조할당
  // 상태관리
  // 상태가 변하면 렌더링이 다시 된다.

  const {name, age} = {name: "김준일", age: 31};
  const [num1, num2, num3, num4] = [1,2,3,4];

  console.log("콘솔 호출");
  
  const handleClick = () => {
    setNameArrayState([...nameArrayState, "김준사"]);
    console.log(names);
  }
  // function handleClick() {

  // }

// nameArrayState.map(name => <h1>{ name }</h1>)
  return <>
    <button onClick={ handleClick }>추가</button>
    <div>
        { nameArrayState.map(name => <h1>{ name }</h1>) }
    </div>
  </>; // 리턴 부분 jsx html onclick react에서는 onClick(카멜)
}
// function handleClick() {
// }

// 컴포넌트
  
// export default function App1() {
//   return <>
//     <div>App</div>
//     <div></div>
//     </>;
// } //App function x
// // default라고 적혀있는 게 매인
// export function App2() {
//   return <>
//     <div>App2</div>
//     <div></div>
//   </>
// }

