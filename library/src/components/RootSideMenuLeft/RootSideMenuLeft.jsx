/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtom";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { RiSettings4Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";



 
function RootSideMenuLeft() {
  const [ show, setShow ] = useRecoilState(menuState);
  const [ isLogin, setLogin ] = useState(false);
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");
  const navigate = useNavigate();


  useEffect(() => {
    setLogin(() => principalQueryState.status === "success");
  }, [principalQueryState.status]) // 무엇을 바꾸는 상태

  const handleCloseClick = () => {
    setShow(() => false);
  }

  return (
    <div css={s.layout(show)} onClick={(e) => e.stopPropagation()}>
      <div css={s.header}>
        <button css={s.menuButton} onClick={handleCloseClick} >
          <HiMenu />
        </button>
      </div>

      <div css={s.profile}>
        {
          !isLogin // principalQueryState.status === "success"
          ?
          <div css={s.authButtons}>
              <button onClick={() => navigate("/auth/signin")}>로그인</button>
              <button onClick={() => navigate("/auth/signup")}>회원가입</button>
          </div>
          :
          <>
            <div css={s.settings}>
              <RiSettings4Line />                
            </div>
            <div css={s.profileBox}>
              <div css={s.profileImg}>
                <FiUser />
              </div>
              <div css={s.usernameAndEmail}>
                <span>{principalQueryState.data.data.username}</span>
                <span>{principalQueryState.data.data.email}</span>
              </div>
            </div>
        </>
        }
      </div>
      <div css={s.menuList}>
        <Link css={s.menuLink}>
            도서검색
        </Link>
      </div>
    </div>
  );
}

export default RootSideMenuLeft;