/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";

const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const imageLayout = css`
  
`;

function ImageEx(props) {

  const [ preview, setPreview ] = useState("");
  const imgFileRef = useRef(0);

  const handleImgFileChange = (e) => {
    const fileReader = new FileReader();
    
    if(e.target.files.length === 0){
      return;
    }
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
  
    fileReader.readAsDataURL(e.target.files[0]);
  }

  const handleButtonClick = () => {
    imgFileRef.current.click();
  };



  return (
    <div css={layout}>
      <div css={imageLayout}>
        <img src={preview} alt="" />
      </div>
      <input style={{display: "none"}} type="file" ref={imgFileRef} onChange={handleImgFileChange} />
      <button onClick={handleButtonClick}>이미지 불러오기</button>
    </div>
  );
}

export default ImageEx;