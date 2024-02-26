/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { storage } from "../../configs/firebase/fireBaseConfig";
import { upload } from "@testing-library/user-event/dist/upload";
import { Line } from "rc-progress";

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
  const [ uploadFiles, setUploadFiles ] = useState([]);
  const [ previews, setPreviews ] = useState([
  
  ]); // id: 데이터: 임시키값 index 배열에서
  const [ progressPercent, setProgressPercent ] = useState(0);
  const imgFileRef = useRef();

  const handleImgFileChange = (e) => {
    
      // console.log(e.target.files);//가지고  for안에 자체 Promise(반복)

      // let ps = [
      //    new Promise(resolve => resolve(1)),
      //    new Promise(resolve => resolve(2)),
      //    new Promise(resolve => resolve(3))
      // ];

      // Promise.all(ps).then(result => console.log(result));

      // setUploadFiles([...upload, e.target.files]);
      
      const files = Array.from(e.target.files);

      if(files.length === 0) {
        imgFileRef.current.value = "";
        return;
      }// 파일 열기 취소
      setUploadFiles(files);
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
    //미리보기용도 실제로 필요없음. firebase랑 연관 x 저장되는거 아니다.

   

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

  const handleImageUpload = () => {
    const file = uploadFiles[0];
    console.log(uploadFiles);
    const  storageRef = ref(storage, `files/test/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on();
  }

  
  return (
    <div css={layout}>
      {previews.map((preview, index) =>
      <>
          <div key={index} css={imageLayout}>
             <img src={preview} alt="" />
          </div>
          <Line percent={progressPercent} strokeWidth={4} strokeColor={"#22222"}/>
      </>
      )}
      <input style={{ display: "none" }} type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChange} />
      <button onClick={handleButtonClick}>이미지 불러오기</button>
      <button onClick={handleImageUpload}>이미지 업로드</button>
    </div>
  );
      
};

export default ImageEx;