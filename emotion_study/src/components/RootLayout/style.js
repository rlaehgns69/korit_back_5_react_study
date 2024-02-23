import { css } from "@emotion/react";

export const layout = css`
  position: fixed; // fixed 하는 순간 중앙정렬의미 x fragment가 부모 root.render ('root') div
  transform: translateX(-50%);
  left: 50%;
  //margin: 0px auto;위아래 0 양쪽 마진
  z-index: 1;
  width: 1000px;
  height: 100%;
  background-color: white;
  //height: 100% body의 높이 요소의 높이 
  overflow-y: scroll;
`;