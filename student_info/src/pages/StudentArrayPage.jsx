import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage(props) {
  const [ studentList, setStudentList ] = useState([]);   
  // const studentObj = {
  //   id: 0,
  //   name: "",
  //   age: 0,
  //   address: ""
  // };
  // useState(studentObj)
  // const [ student, setStudent ] = useState({
  //   id: 0,
  //   name:"",
  //   age:"",
  //   address:""
  // });
  // 틀을 기본값(초기값 세팅)
  const [inputValue, setInputValue] = useState({
    id: "",
    name: "",
    age: "",
    address:"" 
  });

  const [ updateId, setUpdateId ] = useState(0);

  const staticId = useRef(0);
  // staticId.current 값이 변해도 렌더링 x
  // 재렌더링이 발생해도 초기화되지 않음.

  useEffect(()=>{
    console.log(studentList);
  }, [studentList]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  }
  
  const handleAddClick = () => {
    // console.log(staticId.current+=1)
    const student = {
      ...inputValue,
      id: staticId.current +=1
    };
    setStudentList([...studentList, student])
  }

  const handleDeleteClick = (id) => {
    setStudentList([...studentList.filter(student => student.id != id)])
  }//삭제

  const handleUpdateClick = (id) => {
    setUpdateId(id);
    setInputValue(studentList.filter(student => student.id === id)[0]);//필터결과 배열
    // id 하나 
  }//수정

  const handleUpdateSubmitClick = (id) => {
    // const nums = [1,2,3,4,5];
    // const findIndex = nums.indexOf(3);
    const findIndex = studentList.indexOf(studentList.filter(student => student.id === updateId)[0]);
    //필터 배열[0] 인덱스 찾음
    const updateStudentList = [...studentList]; //상태 변수 studentList setStudent로만 바꾸자
    // 새로운 배열 복제 studentList랑 다른 배열 주소

    updateStudentList[findIndex] = inputValue; // 객체가 바뀜 상태 x
    // studentList[findIndex] = {
    //   ...inputValue
    // }
    
    setStudentList(updateStudentList); //자기자신을 set 상태가 바뀜.
    handleCancelClick();
  }

  const handleCancelClick =() => {
    setUpdateId(0);
    setInputValue({
      id: "",
      name: "",
      age: "",
      address:""
    });
  }//취소

  return (
    <div>
        <div>
          <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID' />
          <input type="text" name='name' onChange={handleInputChange} value={inputValue.name} placeholder='이름' />
          <input type="text" name='age' onChange={handleInputChange} value={inputValue.age} placeholder='나이' />
          <input type="text" name='address' onChange={handleInputChange} value={inputValue.address} placeholder='주소' />
          <button onClick={handleAddClick}>추가</button>
        </div>   
        <table>
          <thead>
            <tr>
                <th>id</th>
                <th>이름</th>
                <th>나이</th>
                <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(student => {
              return <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.address}</td>
                <td>
                  {
                    updateId !== student.id
                     ? <button onClick={()=>{handleUpdateClick(student.id);}}>수정</button>
                     : <button onClick={handleUpdateSubmitClick}>확인</button>
                  }
                </td>
                  
                <td>
                  {
                    updateId !== student.id 
                    ? <button onClick={()=>{handleDeleteClick(student.id);}}>삭제</button>
                    : <button onClick={handleCancelClick}>취소</button>
                  }
                </td>
                
              </tr>
            })}
          </tbody>
        </table> 
    </div>
    

);
}

export default StudentArrayPage;