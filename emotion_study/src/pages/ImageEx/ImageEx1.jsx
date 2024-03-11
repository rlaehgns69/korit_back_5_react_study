/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/fireBaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid";

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
  width: 300px;
  height: 300px;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  & > img {
    width: 100%;
  }
`;

function ImageEx(props) {

  const handleButtonClick = () => {
    imgFileRef.current.click();
  };
  const [ urls, setUrls ] = useState([]);
  // const [ downloadURL, setDownloadURL ] = useState();
  const [ uploadFiles, setUploadFiles ] = useState([]);
  const [ previews, setPreviews ] = useState([
  
  ]); // id: 데이터: 임시키값 index 배열에서
  const [ progressPercent, setProgressPercent ] = useState(0);
  const imgFileRef = useRef();

  useEffect(() => {
    // 없으면 undefined "" 비었다.=> []빈배열
    setUrls(!localStorage.getItem("urls") ? [] : JSON.parse(localStorage.getItem("urls")));
    // 자바스크립트 문자열이 비거나 0, null, undefined => false
    // getItem 안들어있으면 "" !! not의not true
  }, []);// 최초한번

  const handleImgFileChange = (e) => {
    
      // console.log(e.target.files);
      //가지고  for안에 자체 Promise(반복)
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
          // console.log(e.target.result);
          //setPreviews([...previews, e.target.result]);여기서 x
          resolve(e.target.result);
        };//정의만
        fileReader.readAsDataURL(file);
      }));

      Promise.all(promises)
      .then(result => {
        setPreviews(result);
        // console.log(result);
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
    const storageRef = ref(storage, `files/test/${uuid()}_${file.name}`);//파일명 고유한 값
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed", //상태가 변하고 있는 상태(업로드 되고 있는 상태)
      (snapshot) => {
        setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
      },
      (error) => {},
      () => {
        // alert("업로드 완료");
          getDownloadURL(storageRef).then(urls => {
            localStorage.setItem("urls", urls);
            setUrls(urls);
            setPreviews([]);//업로드후 미리보기 빈배열
          })
      }
    );
  

  }

  
  return (
    <div css={layout}>
      {urls.map(urls=>
        <div css={imageLayout}>
      <   img src={urls} alt="" />
        </div>
        )}
      
      {previews.map((preview, index) =>
      <>
          <div key={index} css={imageLayout}>
             <img src={preview} alt="" />
          </div>
          <Line percent={progressPercent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
      </>
      )}
      <input style={{ display: "none" }} type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChange} />
      <button onClick={handleButtonClick}>이미지 불러오기</button>
      <button onClick={handleImageUpload}>이미지 업로드</button>
    </div>
  );
      
};

export default ImageEx;