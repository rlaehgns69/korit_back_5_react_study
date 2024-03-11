import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; // center -> flex-start
    padding: 0px 20px;
    width: 100%;
    height: 90%;
    color: white;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const title = css`
    font-size: 18px;
    cursor: default;
`;
export const submitButton = css`
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 700;
    background-color: transparent;
    cursor: pointer;
    &:hover {
        color: #a8e0ff
    }
`;

// 불러오기를 밑으로 내리기 위해서
export const container = css`
    display: flex;
    /* align-items: flex-start; */
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    width: 100%;
`;

export const imageBox = css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* align-items: center; */

    border: 1px solid #000000;
    width: 94px;
    height: 94px;
    background-color: white;

    overflow: hidden;
    cursor: pointer;

    &:hover {
        border: 2px solid #000000;
    }
    &:active {
        border: 3px solid #000000;
    }

    & > img {
        height: 100%;
    }
    
   
`;

export const checkBox = css`
    display: none;

     // 타입선택자 속성선택자
    // 인접형제 +
    // 그냥 형제 ~
    & + label > div {
        display: none;
    }

    &:checked + label > div {
        position: absolute;
        bottom: 5px;
        right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background-color: #fafafa;
        font-size: 12px;
        font-weight: 600;
        color: #222222;
       
        cursor: pointer;
    }
    
`;