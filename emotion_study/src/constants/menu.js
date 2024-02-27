import ImageEx from "../pages/ImageEx/ImageEx";
import ImageEx2 from "../pages/ImageEx2/ImageEx2";
import MyPage from "../pages/MyPage/MyPage";

export const MENUS = [
    {
      id: 1,
      path: "/mypage",
      name: "마이페이지",
      element: <MyPage />
    },
    {
      id: 2,
      path: "/board",
      name: "게시판",
      element: <>게시판</>
    },
    {
      id: 3,
      path: "/notice",
      name: "공지사항",
      element: <>공지사항</>
    },
    {
      id: 4,
      path: "/image/ex",
      name: "이미지 불러오기",
      element: <ImageEx />
    },
    {
      id: 5,
      path: "/image/ex2",
      name: "다중 업로드",
      element: <ImageEx2 />
    }
];