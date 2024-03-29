import { css } from "@emotion/react";
export const layout=(isShow) => css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  top: ${isShow ? "0px" : "-80px"};
  border-bottom: 1px solid #dbdbdb;

  width: 960px;
  height: 80px;

  transition: top 0.5s ease-in-out;
  background-color: white;
  box-shadow: 0px 1px 2px #00000022;
`;
export const toggleButton = css`
  box-sizing: border-box;
  position: absolute;
  
  bottom: -15px;
  right: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid #dbdbdb;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 50px;
  height: 15px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ccc;
  }
  `;

  export const menuList = css`
    display: flex;
    justify-content: center;
    align-items:  center;

  `;

  export const menuItem = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px;

    border: 1px solid #dbdbdb;
    width: 200px;
    height: 50px;
    color: black;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
    &:active {
      background-color: #dbdbdb;
    }
  `;