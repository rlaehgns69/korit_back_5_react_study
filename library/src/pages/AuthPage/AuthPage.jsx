/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import OAuth2Page from "../OAuth2Page/OAuth2Page";
import OAuth2SigninPage from "../OAuth2SigninPage/OAuth2SigninPage";
import OAuth2SignupPage from "../OAuth2SignupPage/OAuth2SignupPage";
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';
import { useQueryClient } from "react-query";
import OAuth2MergePage from "../OAuth2MergePage/OAuth2MergePage";

function AuthPage() {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  
    useEffect(() => {
      if(!!principalData) {
        alert("잘못된 접근입니다.");
        window.location.replace("/");
      }
    }, []);
    return (
    <div css={s.layout}>
      <Routes>
        <Route path='/signin' element={ <SignInPage /> } />
        <Route path='/signup' element={ <SignUpPage /> } />
        <Route path='/oauth2' element={ <OAuth2Page /> } /> 
        <Route path='/oauth2/signin' element={ <OAuth2SigninPage /> } />
        <Route path='/oauth2/merge' element={ <OAuth2MergePage /> } />
        <Route path='/oauth2/signup' element={ <OAuth2SignupPage /> } />
      </Routes>
    </div>
  );
}

export default AuthPage;
