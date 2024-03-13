import { css } from "@emotion/react";

export const header = css`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid #dbdbdb;
  padding: 0px 10px;
  width: 100%;
  height: 50px;
`
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
