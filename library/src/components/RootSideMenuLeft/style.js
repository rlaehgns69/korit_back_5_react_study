import { css } from "@emotion/react";


export const layout = (show) => css`
  transition: all 0.5s ease-in-out; //모양변경 
  opacity: ${show ? 1: 0};
  position: absolute;
  top: 0;
  /* left: 0; */
  left: ${show ? "0px" : "-200px"};
  box-sizing: border-box;
  border-right: 1px solid #dbdbdb;
  padding: 10px 0px;
  width: 200px;
  height: 100%;
  background-color: #fafafa;
`;

export const header = css`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end; //세로축 오른쪽
  align-items: center;//가로축 중간정렬
  border-bottom: 1px solid #dbdbdb;
  padding: 0px 10px;
  width: 100%;
  height: 50px;
`;

export const menuButton = css`
  box-sizing: border-box;
  border: none;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;

  // 메뉴 안에 icon밖에 없음.
  & > * {
    font-size: 16px;
  }
`

export const profile = css`
  box-sizing: border-box;
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 150px;
`

export const menuList = css`
`;

export const menuLink = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  padding: 0px 20px;
  height: 40px;
  background-color: #fdfdfd;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #222222;

`;