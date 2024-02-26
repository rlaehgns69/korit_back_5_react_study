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

  const handleButtonClick = () => {
    imgFileRef.current.click();
  };

  const [ previews, setPreviews ] = useState([

  ]); // id: 데이터: 임시키값 index 배열에서
  const imgFileRef = useRef();

  const handleImgFileChange = (e) => {
      // console.log(e.target.files);//가지고  for안에 자체 Promise(반복)

      // let ps = [
      //    new Promise(resolve => resolve(1)),
      //    new Promise(resolve => resolve(2)),
      //    new Promise(resolve => resolve(3))
      // ];

      // Promise.all(ps).then(result => console.log(result));

      const files = Array.from(e.target.files);
      let promises = [];
      // Promise new Promise 하자마자 실행 - 정의만

      promises = files.map(file => new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
          console.log(e.target.result);
          //setPreviews([...previews, e.target.result]);여기서 x
          resolve(e.target.result);
        };//정의만
        fileReader.readAsDataURL(file);
      }));
      Promise.all(promises)
      .then(result => {
        setPreviews(result);
        console.log(result);
      }); // fileList map사용 불가
    }

   

      // for(let file of e.target.files) {
      //   promises = [...promises, new Promise((resolve) => {
      //     const fileReader = new FileReader();
  
      //     fileReader.onload = (e) => {
      //       console.log(e.target.result);
      //       setPreviews([...previews, e.target.result]);여기서 x
      //       resolve(e.target.result);
      //     };//정의만
      //     fileReader.readAsDataURL(file);
      //   })];
      // // }
      // Promise.all(promises)
      // .then(result => {
      //   setPreviews(result);
      //   console.log(result);
      // });// 실행 여기서
        // const fileReader = new FileReader();
  
        // fileReader.onload = (e) => {
        //   console.log(e.target.result);
        //   setPreviews([...previews, e.target.result]);
        // 비동기 Promise사용 프로미스올 동일한 동작 순서대로
        // };
        // console.log(fileReader.readyState); 반복문을 한번에 돌린다.
        // fileReader.readAsDataURL(file);
        // while(fileReader.readyState !== 2) {}


  
  return (
    <div css={layout}>
      {previews.map((preview, index) =>
        <div key={index} css={imageLayout}>
          <img src={preview} alt="" />
        </div>
      )}
      <input style={{ display: "none" }} type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChange} />
      <button onClick={handleButtonClick}>이미지 불러오기</button>
    </div>
  );
      
};

export default ImageEx;