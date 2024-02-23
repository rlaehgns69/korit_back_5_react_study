/** @jsxImportSource @emotion/react */
import * as S from "./style";
import logo512 from "./logo512.png";

function MyPage(props) {
  return (
    <div css={S.layout}>
      <h1 css={S.title}>마이페이지</h1>
      <div css={S.profileImg}>
          <img src={logo512} alt="" />
      </div>
      <div css={S.nicknameLayout}>
        <input css={S.nickname} type="text" maxLength={20} />  
      </div>
      <div css={S.profileInputLayout}>
        <div css={S.inputBox}>
          <input css={S.profileInput} id="name" type="text" />
          <label htmlFor="name">성명</label>
        </div>
        
      </div>
      <div css={S.buttonLayout}>
        <button css={S.proFilebutton}>수정하기</button>
      </div>
    </div>
  );
}

export default MyPage;