import React, { useEffect, useRef, useState } from 'react';
import StudentInfo from '../components/StudentInfo';
import InfoInput from '../components/InfoInput';
import InFoButtons from '../components/InFoButtons';

function StudentPage(props) {
  const studentObj = {
    name: "",
    age: "",
    address: ""
  };

  // const [ name, setName ] = useState("");
  // const [ age, setAge ] = useState("");
  // const [ address, setAddress ] = useState("");
  // 객체로 변경
  const [ student, setStudent ] = useState(studentObj);// 상태
  const [ inputValues, setInputValues ] = useState(studentObj);
  
  const inputRef = {
    name: useRef(),
    age: useRef(),
    address: useRef()
  }
  // const nameInputRef = useRef();
  // const ageInputRef = useRef();
  // const addressInputRef = useRef();

  useEffect(() => {
    console.log(inputRef.current);
  },[]); // querySelector

  useEffect(() => {
    setInputValues(studentObj);
  }, [student])
  
  // const [ refresh, setRefresh ] = useState(false);
  
  // useEffect(() => {
  //   if(refresh){
  //     setInputValues(studentObj);
  //   }
  //   setRefresh(true);
  // }, [student]);UseEffect html DOM 변화 인식 
  // ,[](dependencies) [student] student의 상태가 바뀌면
  // [student, inputValues] 둘중 하나가 바뀌면
  // [] - useEffect 최초 한번실행 (한번만 동작하고 dependencies가 없으니까 동작하지 않음.)
  // student가 바뀌면 setInputValues해라.

  // const student = {
  //   name: "",
  //   age: "",
  //   address: ""
  // }
  
  
  /**
   * js객체 특징
   * 1. 키값은 문자열이어도 된다.
   * 2. 변수의 문자열 값을 키값으로 쓰고 싶을 때 
   * []대괄호로 묶어서 참조할 수 있다.
   * 3. 변수명만 입력하면
   * 변수 자체를 객체의 속성과 value로 한번에 정의할 수 있다.
   */

  // 객체 사용방법
  // 상태가 변하면 초기화 useState
  // let inputValues = {
  //   name: "",
  //   age: "",
  //   address: "" //ok눌렀을 때 App
  // }

  const handleInputChange = (e) => {
    // 원래 조건문
    const { name, value } = e.target;
    setInputValues({
      // 이전 초기화
      ...inputValues, 
      [name]: value//name값에 따라 덮어씀. 
      //e.target name name value, age .. adderss...
    }); //js에서만 사용가능한 객체의 특징 let user 키값은 문자열이 올 수 있다.
    // e.target.name, e.target.value

    // switch(name) {
    //   case "name":
    //     inputValues.name=value;
    //     break;
    //   case "age":
    //     inputValues.age=value;
    //     break;
    //   case "address":
    //     inputValues.address=value;
    //     break;
    //   default:
    //     console.log();
    // }
    
  }

  const handleOnOk = () => {
    setStudent(inputValues);
    // new Promise((resolve, reject) => {
      //set value를 지정하고 있어야 된다.
    //   setStudent(inputValues);//1날아감
      // 값이 바뀌었을 때
    //   resolve();//먼저실행
    // }).then(() => {
      // ok를 눌렀을 때 객체에 값 저장.
    // setInputValues(studentObj);//resolve다음 실행 이것도 의미가 없음.
    // ok를 눌렀을 때 비움.
    // }); //비동기 

    // set은 비동기다.(순서 보장 x 비우기 먼저 되면 값이 빈값)
    // setStudent가 먼저완료가 되면
    // async await await(프로미스 객체 앞에다만)
    // 프로미스 앞에다가 새로 만들어줌.

  }// const useState상태에 넣어야된다.

  const handleOnClean = () => {
    setStudent(studentObj);
  }

  return(
    <>
      <StudentInfo title="이름" text={student.name}/>
      <StudentInfo title="나이" text={student.age}/>
      <StudentInfo title="주소" text={student.address}/>
      
      <InfoInput 
        name= {"name"}
        onChange={handleInputChange}
        value={inputValues.name}
        placeholder="이름"
        inputRef={inputRef.name}
      />

      <InfoInput 
        name= {"age"}
        onChange={handleInputChange}
        value={inputValues.age}
        placeholder="나이"
        inputRef={inputRef.age}
      />

      <InfoInput 
        name= {"address"}
        onChange={handleInputChange}
        value={inputValues.address}
        placeholder="주소"
        inputRef={inputRef.address}
      />
      <InFoButtons>
        <button onClick={ handleOnOk }>확인</button>
        <button onClick={ handleOnClean }>비우기</button>
      </InFoButtons>
        
    </>
  );
}

export default StudentPage;
