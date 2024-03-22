/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import { sendAuthMailRequest } from "../../apis/api/sendAuthMail";
import FullSizeLoader from "../../components/FullSizeLoader/FullSizeLoader";
import { GoCheckCircle } from "react-icons/go";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";

function MyPage() {
  useAuthCheck();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  //react-query get요청 때만 사용
  const sendAuthMailMutation = useMutation({
    mutationKey: "sendAuthMailMutation",
    mutationFn: sendAuthMailRequest,
    retry: 0,
    onSuccess: (response) => {
      if(response.data) {
        alert("메일 전송을 완료하였습니다.")
      }else {
        alert("메일 전송에 실패하였습니다.")
      }
    }
  }); // 리액트 쿼리 중 하나 post update delete

  const handleSendAuthMailClick = () => {
    sendAuthMailMutation.mutate(); // mutationFn호출 post요청
  };

  return (
    <>
      {
      sendAuthMailMutation.isLoading 
      ? <FullSizeLoader /> 
      : <div css={s.layout}>
          <div css={s.header}>
            <div css={s.imgBox}>
              <div css={s.profileImg}>
                <img src=" " alt="" />
              </div>
            </div>
            <div css={s.infoBox}>
              <div css={s.infoText}>사용자이름: {principalData?.data.username}</div>
              <div css={s.infoText}>이름: {principalData?.data.name}</div>
              <div css={s.emailBox}>
                <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                {
                principalData?.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0 
                ? <button css={s.infoButton} onClick={handleSendAuthMailClick}>인증하기</button>
                : <div css={s.emailCheck}><GoCheckCircle /></div>
                  //authorities배열 꺼내서 filter
                }
              </div>
              <div css={s.infoButtons}>
                <button css={s.infoButton}>정보 수정</button>
                <button css={s.infoButton} onClick={() => navigate("/account/edit/password")}>비밀번호 수정</button>
              </div>
            </div>
          </div>
          <div css={s.bottom}>

          </div>
        </div>
      }
    </>
  );
}

export default MyPage;