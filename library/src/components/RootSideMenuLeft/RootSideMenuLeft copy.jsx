/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtom";
import { FiUser } from "react-icons/fi";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";



 
function RootSideMenuLeft() {
  const [ show, setShow ] = useRecoilState(menuState);
  const [ isLogin, setLogin ] = useState(false);
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");

  useEffect(() => {
    setLogin(() => principalQueryState.status === "succee");
  }, [principalQueryState.status])

  const handleCloseClick = () => {
    setShow(() => false);
  }

  return (
    <div css={s.layout(show)}>
      <div css={s.header}>
        <button css={s.menuButton} onClick={handleCloseClick} >
          <HiMenu />
        </button>
      </div>
      <div css={s.profile}>
      {
        !isLogin
        ? <Link css={s.login} to={"/auth/signin"}>
            <button>로그인</button>
          </Link>
        :
        <>
          <Link css={s.profileImg} to={"/account/mypage"}>
            <FiUser />
            <div>사용자이름</div>
            <div>사용자이메일</div>
          </Link>
          <div>
            <FaGear />
          </div>
        </>
          
      }

       
        <div>

        </div>
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