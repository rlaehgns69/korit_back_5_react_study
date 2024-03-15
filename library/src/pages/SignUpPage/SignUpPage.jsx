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

  const [ username, setUsername, usernameMessgage, userNameChange] = useInput("username");
  const [ password, setPassword, passwordMessage, passwordChange] = useInput("password");
  const [ checkPassword, setCheckPassword, checkPasswordChange] = useInput("checkPassword");
  const [ name, setName, nameMessage, nameChange] = useInput("name");
  const [ email, setEmail, emailMessage, emailChange] = useInput("email");
  
  const handleSignSubmit = () => {

  }


  return (
    <div>
        <div css={s.header}>
          <h1>회원가입</h1>
          <RightTopButton onClick={handleSignSubmit}> 가입하기 </RightTopButton>
        </div>
        <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} message={usernameMessgage} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
        <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호확인"} value={checkPassword} onChange={checkPasswordChange}  message={null} />
        <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={nameMessage} />
        <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={emailMessage} />
        
        
    </div>
  );
}

export default SignUpPage;