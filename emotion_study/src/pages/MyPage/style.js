import { css } from "@emotion/react";

// export const box = css`
//   box-sizing: border-box;
//   margin: 10px;
//   border: 1px solid #dbdbdb;
//   width: 300px;
//   height: 300px;
  
// `;
export const layout = css`
  padding: 100px 30px 0px;
`;

export const title = css`
  margin-bottom: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

// export const imgLayout = css`
  
//   width: 300px;  
// `;

export const profileImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto 20px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  overflow: hidden; //넘치는 부분 숨기기
  cursor: pointer;
  & > img {
    width: 100%;
    //height: 100%;
  }
  //밑에 안보이는 부분
`;//이미지 완성
export const nicknameLayout = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const nickname = css`
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 2px solid #dbdbdb;
  padding: 5px 10px 0px;
  text-align: center;
  width: 200px;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  
  &:focus{
    border-bottom: 2px solid #bbb;
    background-color: #fafafa;
  }
`;

export const profileInputLayout = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto 20px;
  border: 1px solid #dbdbdb;
  padding: 10px;
  width: 700px;
  box-shadow: 1px 1px 5px #00000022;
`;
export const inputBox = css`
  position: relative;
`;

export const profileInput = css`
  box-sizing:  border-box;
  margin-bottom: 10px;
  //padding: 10px 20px;
  padding: 20px 20px 10px;
  font-size: 16px;

  width: 335px;
  &:nth-of-type(3n), &:nth-of-type(4n) {
    margin: 0;
  }

  &+label {
    position: absolute;
  }
`;
export const buttonLayout = css`

`;
export const proFilebutton = css`

`;
