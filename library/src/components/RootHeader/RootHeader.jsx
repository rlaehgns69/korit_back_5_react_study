/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

import { principalState } from "../../atoms/principalAtom";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import instance from "../../apis/utils/instance";

function RootHeader() {
  const [ show, setShow] = useRecoilState(menuState);
  const [ isLogin, setLogin ] = useState(false);
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");

  // const principal = queryClient.getQueryData("principalQuery");//이 키값을 가지고 있는 쿼리 데이터


  useEffect(() => {//첫렌더링 동작 이후 응답이 안왔는데 useEffect에서 찍어버림. undefined
    //console.log("useEffect");// 동작 안걸었지만, 마운트될 떄마다 응답 (응답이 와있는 상태)    
    setLogin(() => principalQueryState.status === "success");
  }, [principalQueryState.status]); // undefined였는데

  
  const handleOpenClick = (e) => {
    e.stopPropagation();
    setShow(() => true);
  }
  const handleLogoutClick = () => {
    localStorage.removeItem("AccessToken");
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });// axios에 interceptors 요청 때 use사용
    queryClient.refetchQueries("principalQuery");// token 제거후 응답데이터 401 retry 0
    window.location.replace("/auth/signin")//위에 없어도됨. 다시 날라감.
  }
  // const handleRefetch = () => {
  //   queryClient.refetchQueries("principalQuery");

  // }
  return (
    <div css={s.header}>
      <button css={s.menuButton} onClick={handleOpenClick}>
        <HiMenu />
        </button>
        
        {
          !isLogin//undefined 로그인x 401데이터없는 상태 / 있으면 div뿌려주겠다.ㄴ
          ? <Link css={s.account} to={"/auth/signin"}>
              <FiUser />
            </Link> 
          :
          <div css={s.accountItems}>
            <button css={s.logout} onClick={handleLogoutClick}>
              <FiLogOut />
            </button>
            <Link css={s.account} to={"/account/mypage"}>
              <FiUser />
            </Link>
          </div>
          
        }
        
    </div>
  );
}

export default RootHeader;