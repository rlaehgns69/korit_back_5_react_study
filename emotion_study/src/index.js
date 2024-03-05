import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ComponentStudy, {Test} from './pages/ComponentStudy/ComponentStudy';
// default 이름 {test Test컴포넌트} 비구조할당
const root = ReactDOM.createRoot(document.getElementById('root'));
// ComponentStudy(10,20)
//test();

// const {a,b} = { // props
//   a: 10,
//   b: 20
// }
// props.a -> a, b
root.render
(
  <ComponentStudy a={10} b={30} c={0} /> //속성명 안뜬다. c자동완성
  //<Test />
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
