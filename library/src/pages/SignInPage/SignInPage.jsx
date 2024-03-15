/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";

function SignInPage() {
  const [ username, usernameChange ] = useInput();
  const [ password, passwordChange ] = useInput();
  // 얘네들은 로그인할때 정규식 체크안함.
  return (
    <>
        <div css={s.header}>
          <h1>로그인</h1>
          <RightTopButton onClick={null}>로그인하기</RightTopButton>
        </div>
        <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
        <Link to={"/auth/signup"}>회원가입</Link>
        <div>
          <Link>카카오로그인</Link>
          <Link>구글로그인</Link>
          <Link>네이버로그인</Link>
        </div>
    </>
  );
}

export default SignInPage;