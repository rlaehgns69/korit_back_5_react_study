import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { useCallback, useEffect } from "react";
import { getPrincipalRequest } from "../apis/api/principal";
import { useRecoilState } from "recoil";
import { principalState } from "../atoms/principalAtom";
import { useQuery } from "react-query";
import RootSideMenuLeft from "../components/RootSideMenuLeft/RootSideMenuLeft";
import RootHeader from "../components/RootHeader/RootHeader";
import { GridLoader } from "react-spinners";
import FullSizeLoader from "../components/FullSizeLoader/FullSizeLoader";
import MyPage from "../pages/MyPage/MyPage";
import PageContainer from "../components/PageContainer/PageContainer";

// useQuery => GET 요청시에 사용.
// 첫번째 매개변수 => 배열["key값", dependency] -key값 전역상태, key값을 가지고 다른곳에서 useQuery호출가능
// 두번째 매개변수 => 요청메소드(async, await)
/* 세번째 매개변수 => 옵션 객체 형태
  {
    retry: 0, 
    refetchOnWindowFocus: false,
    onSuccess: 함수,
    onError: 함수,
    enabled: true or false // 요정도 그외 interval 시간마다 요청 날리는 
  }
*/
function AuthRoute(props) {
 
  const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,
  {//변수와 일치, key값 함수-api위치
    retry: 0,
    refetchOnWindowFocus: false,//옵션- 다른곳에 있다가 윈도우포커스가 리페치할거냐
    onSuccess: response => {
      console.log("onSuccess");
      console.log(response);
    },
    onError: error => {
      console.log("오류");
      console.log(error);
    }
  });

  return (
    <>
      <RootSideMenuLeft />
      <RootHeader />
      <PageContainer>
      {
        principalQuery.isLoading 
        ?  <FullSizeLoader size={20}/>
        : <Routes>
          <Route path="/auth/*" element={ <AuthPage /> } />
          <Route path="/" element={ <HomePage /> } /> 
          <Route path="/account/mypage" element={ <MyPage /> } /> 
        </Routes>
          
        

      //  <h1>로딩중...</h1>
      // isLoading 데이터 못들고옴.
      // isLoading 상태 변경 렌더링이 일어남.
       
      }
      </PageContainer>
    </>
  );
}

export default AuthRoute;