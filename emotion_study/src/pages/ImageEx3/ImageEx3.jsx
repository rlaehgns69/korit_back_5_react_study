/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const imgLayout = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  overflow: hidden;

  & > img {
    width: 100%;
  }
`;


function ImageEx3() {
  const fileInputRef = useRef();
  // const fileinput = document.querySelector("input") ==fileInput.current
  const imageIdRef = useRef(0);
  const [ loadImages, setLoadImages ] = useState([]);
  /**
   * {
   *    id:1,
   *    file: file객체,
   *    dataURL: ""
   * }
   */
  const handleFileChange = (e) => {
   //console.log(e.target.files);
    const { files } = e.target;
    const fileArray = Array.from(files);

    if(fileArray.length === 0) {
      return;
    }
    console.log(fileArray.map(file => file.name));

    let promises = [];

    promises =fileArray.map(file => new Promise(resolve => {
      const loadImage = {
        id: imageIdRef.current+=1,
        file,
        dataURL: ""
      };
      //console.log(file.name); 프로미스 실행

      const fileReader = new FileReader();

      fileReader.onload=(e)=>{
        resolve({
          ...loadImage,
          dataURL: e.target.result //비동기 언제 호출될지 모름 resolve 순서대로 호출
        });
        //console.log("onload");프로미스먼저 실행하고 온로드실행
        //console.log(file.name);비동기로 동작
        //  loadImage = {
        //   id: imageIdRef.current+=1,
        //   file,
        //   dataURL: e.target.result
        // };// loadImages
        //이렇게 해야 Promise All 이미지 3개 비동기 완료된 후(하지만 잘못된 코드 id여기서 x) 
      }// 비동기라서 promise안에 넣음.
      //Promise1 onload1 이미지1 이렇게 안 됨.
      fileReader.readAsDataURL(file);
    }));

    Promise.all(promises)
    .then(result => {
      // console.log(result);
      setLoadImages(result);
    });

  }

  return (
    <div css={layout}>
        {loadImages.map(loadImage => 
            <div css={imgLayout} key={loadImage.id}>
                <img src={loadImage.dataURL} alt={loadImage.file.name} />
            </div>)
        }

        <input type="file" style={{display: "none"}} multiple={true} ref={fileInputRef} onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current.click()}>불러오기</button>
    </div>
);
}

export default ImageEx3;