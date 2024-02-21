import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage3(props) {
    const [ studentList, setStudentList ] = useState([]);
    const [ inputValue, setInputValue ] = useState({
        id: "",
        name: "",
        score: ""
    });

    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    });

    const [ updateId, setUpdateId ] = useState(0);

    const staticId = useRef(0);


    useEffect(() => {
        const total = studentList.reduce((result, student) => result + student.score, 0);
        const avg = studentList.length === 0 ? 0 : total / studentList.length;

        setScoreData({
            total,
            avg
        });
    }, [studentList])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const handleAddClick = () => {
        const student = {
            id: staticId.current += 1,
            name: inputValue.name,
            score: parseInt(inputValue.score)
        };

        setStudentList([...studentList, student]);
    }

    const handleRemoveClick = (id) => {
        setStudentList(studentList.filter(student => student.id !== id));
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]);
    }

    const handleCancelClick = () => {
        setUpdateId(0);
        setInputValue({
            id: "",
            name: "",
            score: ""
        });
    }

    const handleUpdateSubmitClick = () => {
        setStudentList(studentList.map(student => {
            return student.id !== updateId ? student : {
                id: updateId,
                name: inputValue.name,
                score: parseInt(inputValue.score)
            };
        }));

        handleCancelClick();
    }

    return (
        <div>
            <div>
                <input type="text" name='id' value={inputValue.id} placeholder='ID' disabled={true} />
                <input type="text" name='name' value={inputValue.name} onChange={handleInputChange} placeholder='이름' />
                <input type="text" name='score' value={inputValue.score} onChange={handleInputChange} placeholder='점수' />
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
                        return (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.score}</td>
                                <td>
                                    {updateId !== student.id 
                                        ? <button onClick={() => handleUpdateClick(student.id)}>수정</button>
                                        : <button onClick={handleUpdateSubmitClick}>확인</button>
                                    }
                                </td>
                                <td>
                                    {updateId !== student.id 
                                        ? <button onClick={() => handleRemoveClick(student.id)}>삭제</button>
                                        : <button onClick={handleCancelClick}>취소</button>
                                    }
                                </td>
                            </tr>
                        )
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

export default StudentArrayPage3;