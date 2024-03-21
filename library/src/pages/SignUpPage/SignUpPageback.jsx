/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [ username, setUsername, userNameChange] = useInput();
  const [ password, setPassword, passwordChange] = useInput();
  const [ checkPassword, setCheckPassword, checkPasswordChange] = useInput();
  const [ name, setName, nameChange] = useInput();
  const [ email, setEmail, emailChange] = useInput();
  const [ messageGroup, setMessageGroup ] = useState({
    username: null,
    password: null,
    checkPassword:null,
    name: null,
    email: null
  });
  // const testErrorMessage = {
  //   type: "success",
  //   text: "등록된 사용자이름입니다."
  // }

  const handleCheckPassword = (e) => {
    if(!!e.target.value) {
      setMessageGroup(messageGroup => {
        return {
          ...messageGroup,
          checkPassword: { 
            type: checkPassword === password ? "success" : "error",
            text: checkPassword === password ? "" : "비밀번호가 서로 일치하지 않습니다."
          }
        }
      })
    }else {
      setMessageGroup(messageGroup => {
        return {
          ...messageGroup,
          checkPassword: null
        }
      })
    }
  }
  const handleSignupSubmit = () => {

    if(messageGroup?.checkPassword?.type === "error") {
      alert("가입할 회원의 정보를 다시 확인하세요.");
      return;
    }
    if(!checkPassword) {
      setMessageGroup(messageGroup => {
        return {
          ...messageGroup,
          checkPassword: {
            type: "error",
            text: "비밀번호를 입력하세요" 
          }
        }
      })
      return;
    }
    const signupData = {
      username,
      password,
      checkPassword,
      name,
      email
    }

    signupRequest(signupData); // promise

  }

  const signupRequest = async (signupData) => {
    try{
      // 그냥 객체 axios JSON으로 변환
      const response = await axios.post("http://localhost:8080/auth/signup", signupData)
      //signupRequest(signupData)
      if(response.data) { // 정상적인 동작이면 안에 data있음 data안에 true있음. response(true) response.data에 true
        navigate("/auth/signin")
      }
      
    } catch(error) {//요청자체가 잘못(서버가 켜지지않은 경우, 응답 못받은 경우)
        // console.log(error);
        const errorMap = error.response.data;
        const entries = Object.entries(errorMap);
        // catch이후 초기화 succes(에러있는 것들만 다시)
        let newMessageGroup = {
          username: {
            type: "success",
            text: "사용할 수 있는 사용자 이름 입니다."
          },
          password: {
            type: "success",
            text: ""
          },
          checkPassword: {
            type: "success",
            text: ""
          },
          name: {
            type: "success",
            text: ""
          },
          email: {
            type: "success",
            text: ""
          }
        };
        // catch할 때마다 enwMessageGroup을 초기화
        // [ [k,v] ]
        for(let [key, value] of entries) {
            newMessageGroup = {
                ...newMessageGroup,
                [key]: {
                  type: "error",
                  text: value 
                }
            }// 기존 메세지 그룹에다가 객체 key값 새로운 객체
            // 메세지 객체를 보낼거라서
            // input에서 error 띄워줄때 message.type, message
          }// 에러 부분수정
          if(newMessageGroup.password.type === "error") {
            newMessageGroup = {
              ...newMessageGroup,
              checkPassword: null
            } // 체크 입력하고나서 확인창 벗어나면 일치하는지 확인
            //원래 입력하고 tab 컨트롤러 많아짐.
            setPassword(() => "");
            setCheckPassword(() => "");
          }
          setMessageGroup(() => newMessageGroup);
          //마지막에 newMessageGroup체크
        }
    // axios json 알아서
    // .then(response => {
      
    // }) 
  }

  return (
    <div>
        <div css={s.header}>
          <h1>회원가입</h1>
          <RightTopButton onClick={handleSignupSubmit}> 가입하기 </RightTopButton>
        </div>
        <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} message={messageGroup.username} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={messageGroup.password} />
        <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호확인"} value={checkPassword} onChange={checkPasswordChange} onBlur={handleCheckPassword} message={messageGroup.checkPassword} />
        <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={messageGroup.name} />
        <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={messageGroup.email} />
        
        
    </div>
  );
}

export default SignUpPage;