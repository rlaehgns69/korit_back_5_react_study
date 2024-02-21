import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {
  const [ studentList, setStudentList] = useState([]);
  // const student = {
  //   id: 0,
  //   name: "",
  //   score: 0
  // }
  const  [ inputValue, setInputValue ] = useState({
    id: 0,
    name: "",
    score: 0
  });
  
  const [ scoreData, setScoreData ] = useState({
      total: 0,
      avg: 0
  });
  const [ updateId ,setUpdateId ] = useState(0);

  const staticId = useRef(0);

  useEffect(() => {
    console.log(studentList);
    setScoreData({
      ...scoreData,
      total:calculateScoreDataTotal(),
      avg: calculateScoreDataAvg()
    });
  }, [studentList]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  }

  const handleAddClick = () => {
    const student = {
      ...inputValue,
      id: staticId.current += 1      
    };
    setStudentList([...studentList, student]);
  }
  const handleDeleteClick = (id) => {
    setStudentList([...studentList.filter(student => student.id !== id)]);
  }

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

  const calculateScoreDataTotal = () => {
   let total = 0;
   for(let i = 0; i <studentList.length; i++) {
    total+=parseInt(studentList[i].score);
   }
   return total; 
  }

  const calculateScoreDataAvg = () => {
   let avg = (calculateScoreDataTotal() / studentList.length || 0)
   return avg;
  }

  return (
    <div>
      <div>
        <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID'/>
        <input type="text" name='name'onChange={handleInputChange} />
        <input type="text" name='score'onChange={handleInputChange} />
        <button onClick={handleAddClick}>추가</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map(student => {
            return <tr key = {student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.score}</td>
              <td>
                {
                  updateId !== student.id
                  ? <button onClick={()=>{handleDeleteClick(student.id);}}>삭제</button>
                  : <button onClick={handleCancelClick}>취소</button>
                }
              </td>
              <td>
              {
                  updateId !== student.id
                  ? <button onClick={()=>{handleUpdateClick(student.id);}}>수정</button>
                  : <button onClick={handleUpdateSubmitClick}>확인</button>
                }
              </td>
            </tr>
          })}
          
        </tbody>
        <tfoot>
          <tr>
            <th>총점</th>
            <th colSpan={2}>{scoreData.total}</th>
          </tr>
          <tr>
            <th>평균</th>
            <th colSpan={2}>{scoreData.avg.toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default StudentArrayPage2;
