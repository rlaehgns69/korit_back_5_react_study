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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #dbdbdb;
  width: 300px;
  height: 300px;
  overflow: hidden;
  & > img {
    width: 100%;
  }
`;

function ImageEx(props) {
  const [ preview, setPreview ] = useState("");
  const imgFileRef = useRef();
  
  const handleFileChange = () => {
    // console.log(e.target.files)
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      console.log(e.target.result);
      setPreview(e.target.result);
    }

    fileReader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div css={layout}>
        <div css={imageLayout}>
          
          <img src={preview} alt="" />
        </div>
      <input style={{ display: "none" }} type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChange} />
      <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
    </div>
  );
}

export default ImageEx;