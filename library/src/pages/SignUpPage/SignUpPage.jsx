/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../../apis/api/signup";

function SignUpPage() {
  const navigate = useNavigate();

  const [ username, userNameChange, usernameMessgage, ] = useInput("username");
  const [ password, passwordChange, passwordMessage ] = useInput("password");
  const [ checkPassword, checkPasswordChange ] = useInput("checkPassword");
  const [ name, nameChange, nameMessage] = useInput("name");
  const [ email, emailChange, emailMessage ] = useInput("email");
  const [ checkPasswordMessage, setCheckPasswordMessage ] = useState(null);


  useEffect(() => {
    // console.log("test") useEffect동작
    // 비어있을때
    // 둘중에 하나라도 비어있으면 값을 비우겠다.
    if(!checkPassword || !password) {
      setCheckPasswordMessage(() => null);
      return;
    }
    // 둘중에 하나라도 빈값이 아니면
    // success인지 error인지
    if(checkPassword === password) {
      setCheckPasswordMessage(() => {
        return {
          type: "success",
          text: ""
        }
      })
    }else {
      setCheckPasswordMessage(() => {
        return {
          type: "error",
          text: "비밀번호가 일치하지 않습니다."
        }
      })

    }
  }, [checkPassword, password]);//둘중에 하나 바뀌면 동작
  
  // 요청들이 다 true일 때 가입하기 버튼 동작
  const handleSignSubmit = () => {
    const checkFlags = [
      usernameMessgage?.type,
      passwordMessage?.type,
      checkPasswordMessage?.type,
      nameMessage?.type, // 참조할게 없으면 안한다. property안에 type이 없으면
      emailMessage?.type // message property있을 때만 .type
    ];
    //console.log(checkFlags);
    // null.type은 undefined
    if(checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
      alert("가입정보를 다시 확인하세요.");
      return;//요청 안날라감.
    }
    signupRequest({
      username,
      password,
      name,
      email // 이객체를 post요청을 해서 넣겠다.
    }).then(response =>{
      console.log(response);
      if(response.status == 201) {
        navigate("/auth/signin");//응답이 오고나면
      } else {
        alert("회원가입 오류");
      }

      
    })
  }


  return (
    <div>
        <div css={s.header}>
          <h1>회원가입</h1>
          <RightTopButton onClick={handleSignSubmit}> 가입하기 </RightTopButton>
        </div>
        <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} message={usernameMessgage} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
        <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호확인"} value={checkPassword} onChange={checkPasswordChange}  message={checkPasswordMessage} />
        <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={nameMessage} />
        <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={emailMessage} />
        
        
    </div>
  );
}

export default SignUpPage;