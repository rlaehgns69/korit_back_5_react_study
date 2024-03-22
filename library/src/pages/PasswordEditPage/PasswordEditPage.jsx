import React from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useInput } from '../../hooks/useInput';

function PasswordEditPage(props) {
  const [ oldPassword, handleOldPassword ] = useInput("oldPassword");
  const [ newPassword, handleNewPassword ] = useInput("newPassword");
  const [ newPasswordCheck, handleNewPasswordCheck ] = useInput("newPasswordCheck");
  return (
    <div>
      <h1>비밀번호 변경</h1>
      <AuthPageInput type={"password"} placeholder={"현재 비밀번호를 입력하세요."} />
      <AuthPageInput type={"password"} placeholder={"새로운 비밀번호를 입력하세요."} />
      <AuthPageInput type={"password"} placeholder={"새로운 비밀번호를 확인하세요.."} />
    </div>
  );
}

export default PasswordEditPage;