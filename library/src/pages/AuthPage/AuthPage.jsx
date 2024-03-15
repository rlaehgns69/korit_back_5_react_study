/** @jsxImportSource @emotion/react */
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import * as s from "./style";
import { Route, Routes } from 'react-router-dom';

function AuthPage() {
  return (
    <div css={s.layout}>
      <Routes>
        <Route path='/signin' element={ <SignInPage /> } />
        <Route path='/signup' element={ <SignUpPage /> } />
        <Route path='/signup/oauth' />
      </Routes>
    </div>
  );
}

export default AuthPage;
