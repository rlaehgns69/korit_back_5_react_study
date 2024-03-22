/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";
import { signinRequest } from "../../apis/api/signin";

function SignInPage() {
  const [ username, usernameChange ] = useInput();
  const [ password, passwordChange ] = useInput();
  // 얘네들은 로그인할때 정규식 체크안함.

  const handleSigninSubmit = () => {
    signinRequest({
      username,
      password
    }).then(response => {
      const accessToken = response.data; //중요
      localStorage.setItem("AccessToken", accessToken);
      window.location.replace("/"); //로그인 완료
    }).catch(error => {
      alert(error.response.data);
    })
  }
  return (
    <>
        <div css={s.header}>
          <h1>로그인</h1>
          <RightTopButton onClick={handleSigninSubmit}>로그인하기</RightTopButton>
        </div>
        <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} />
        <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
        <Link to={"/auth/signup"}>회원가입</Link>
        <div>
          <a href="http://localhost:8080/oauth2/authorization/kakao">카카오로그인</a>
          <a href="http://localhost:8080/oauth2/authorization/google">구글로그인</a>
          <a href="http://localhost:8080/oauth2/authorization/naver">네이버로그인</a>
        </div>
    </>
  );
}

export default SignInPage;