/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom/dist";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const navigate = useNavigate();
    const fileRef =useRef();
    const [ loadPhotos, setLoadPhotos ] = useState([]);
    const [ photoSeq, setPhotoSeq ] = useState([]);

    // photoSeq [3,1,2] 0 1 2 indexOf(1) 1번인덱스 +1 => seq 2번인덱스 +1 => seq 3 0번인덱스 +1 =>1
    // 새롭게 loadPhotos를 만들어주겠다.
    // loadPhotos seq까지 포함
    useEffect(() => {
        // map의 매개변수
        setLoadPhotos(() => loadPhotos.map(
            (photo) => {
                return {
                    ...photo,
                    seq: photoSeq.includes(photo.id) ? photoSeq.indexOf(photo.id) + 1 : 0 // seq변경
                }
            }
        ));
    }, [photoSeq]) //정해질때마다 Seq에 들어올때 마다 기존의 loadPhotos를 map으로 돌린다.
    // set하고 photoSeq변경 여기서 map [0번+1 1번+1 2번+1] 배열 안에 들어있는건 순서를 위해서 객체 안에 id중요
    // 바뀔때마다 순서 정해주겠다.
    // default 0(check x) 순서 1번부터 2번이 들어있는 인덱스 0번 Seq.indexOf(2)=>0 2번이 위치한 index 0
    // 1번이 2 2번이 1 3번이 2 seq check 0번인 녀석빼고 filter id2 seq0(seq가 0번이 아닌녀석들만 
    // [1,3] -> [3,1]sort(a,b) => a.seq-b.seq(오름차순 /반대로 내림차순))

    const handleFileChange = (e) => {
        //console.log(e.target);
        //console.log(e.target.files);
        const fileList = e.target.files;
        const fileArray = Array.from(fileList);

        fileRef.current.value="";

        // 하나만 확인
        // onChange는 취소동작도 일어남.(length가 0)
        if(fileArray.length === 0) {
            return;
        }
        // console.log(fileArray);
        // 취소가 아니면
        // map돌리기 Promise로 바꿔준다.
        // array=>file=>Promise로 바꾼다. Promise All 사용가능
        // 안에 function 프로미스를 실행할 때
        // resolve, reject 프로미스의 기본
        // map의 매개변수 파일 리턴 
        // file객체를 읽어야되니까 매개변수로 file
        // file객체를 읽음.(속도가 다름. 다 읽으면) => 비동기로 onload
        // resolve한테 e.target.result reject동작거리 없어서 지워도 됨.
        // map이 new Promise를 배열에다 넣는다. const filePromiseArray(promises)
        // 어떻게 담겨 있나 확인
        const filePromiseArray = fileArray.map(
            file => 
            new Promise(
                (resolve) => {
                    const fileReader = new FileReader();

                    fileReader.onload = (e) => {
                        console.log(e.target.result);
                        resolve(e.target.result);//resolve는 Promise함수(Promsie배열)
                    }

                    fileReader.readAsDataURL(file);
                }
            )
        );// promise담긴 배열을 만드는 과정

        //프로미스 올 하기 전 "항상초기화"
        
        // 불어온 걸 객체로 바꿔서 새로운 loadPhotos에 넣겠다.
        // localStorage에 저장이 아니라 객체들을 옮겨서 저장 result를 옮겨 담음.
        // PromiseAll promise가 담겨있는 배열을 한번에 담아서 순서대로 실행
        // resolve값들이 result
        // result url url 
        // 그냥 url을 그냥 객체 형태로
        // id** filter쓰거나 map
        Promise.all(filePromiseArray).then(
            (result) => {
                //저장하시겠습니까? 하면 저장
                //Promise all은 저장이 아님.
                setLoadPhotos(() => result.map(
                    (dataUrl, index) => {
                        return {
                            id: index + 1,
                            seq: 0,
                            dataUrl

                        }
                    }
                ));
                
                // useState쓸 일이 없다. 렌더링 일어날 일이 없다.
                // 데이터 들어갈 때 객체 형태 안에들어갈 파일을 newFiles
                
                //console.log(result)이게 뭐지? 찍어본다.
                // 이문자열이 주소에 입력이 되면 이미지가 뜰것이다.
                // img src에 들어가면 이미지가 뜸.
                // result List localstorage에 저장
                // 일단 localstorage
                // 3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?"라는 확인 취소

            });// 실제동작
        // 전부다 실행 시킬 것이다.
        // 실행시키고나서의 결과 then
        // result가 뭐냐? console.log(result);

        //console.log(filePromiseArray)// Promise Promise Promise
        //어떻게 담겼나.
        //원래는 파일3개였는데 map을 돌리고 Promise3개로 바꼈다.(dataUrl 들어있는)
    }

    const handlePhotoCheck = (id) => {
        if(photoSeq.includes(id)) {
            setPhotoSeq(photoSeq => photoSeq.filter(seq => seq !== id))
            // 들어있나? 2만 빼고 다른 것들 담아라. 빈 배열
        }else {
            setPhotoSeq(photoSeq => [...photoSeq, id])
        }//들어있지 않으면 기존 빈배열에서 id추가[2], [2, 1] => 2 제외[1]
    }
    // 순서 [2, 1] seq(상태 useState, useEffect) useEffect function [photoSeq] 최초한번 실행(마운트) 장착(렌더링) 상태가 바뀔때마다(set)
    // console.log(photoSeq);
    
    const handleSubmitClick = () => {
        // 다불러왔다.(이 안) confirm
        const isSave = window.confirm("이미지를 저장하시겠습니까?");
        //확인(true)
        // 오류 똑같은 파일 (기존 ref에 파일 들어와있어서)
        // console.log(isSave);
        // true / false
        if(!isSave) {
            // 취소
            return;
        }
        // 그렇지 않으면 localstorage에 올린다.
        // 4.확인클릭시 localStorage에 key:photo... 넣어라
        // null, undefined -> 존재하지 않는 키값(빈 값)

        //기존의 이미지에 추가
        const localStorageFiles = !localStorage.getItem("photo") 
                                ? [] // 비었으면 빈배열 
                                //JSON변환
                                //값이 있으면 
                                : JSON.parse(localStorage.getItem("photo"));

        const lastId = localStorageFiles.length === 0 
                        ? 0 
                        : localStorageFiles[localStorageFiles.length - 1].id;
        // 문제 localStorageFiles.length가 0이라면

        // map이니까 하나씩 꺼냄.
        // result안에 url 꺼냄 map이니까 index도 받아 올 수 있음.
        //loadPhotos.map 가져오기전에 filter
        const newPhotos = loadPhotos
            .filter(photo => photo.seq !== 0)
            .sort((photoA, photoB) => photoA.seq - photoB.seq)
            .map(
                // 아까 id 버림.
                // 새로운 id localStorage기준
                // seq필용없디.
                (photo, index) => {
                    return {
                        id: lastId + index + 1,
                        imageUrl: photo.dataUrl
                    }
                // result 객체의 배열 추가
                }
            );
        // result가 배열 배열안에 있는 값들만 뽑아내가지고 
        // result 대신에 newPhotos
        const newFiles = [...localStorageFiles, ...newPhotos];        
        //console.log(newFiles);                
        localStorage.setItem("photo",JSON.stringify(newFiles));
        //덮어쓰기
        alert("사진 저장을 완료하였습니다.");
        navigate("/photo/album");
    }

    return (
        <div css={S.layout}>
            <div css={S.header}>
                <h1 css={S.title}>사진 등록하기</h1>
                <button css={S.submitButton} onClick={handleSubmitClick}>완료</button>
            </div>
            
            <input 
                type="file" 
                style={{display: "none"}} 
                multiple={true} 
                ref={fileRef}
                onChange={handleFileChange}
             />
             <div css={S.container}>
                {
                    loadPhotos.map(
                        photo =>
                            <div key={photo.id}>
                                <input css={S.checkBox} type = "checkbox" id={"img" + photo.id} onChange={() => handlePhotoCheck(photo.id)} />
                                <label css={S.imageBox} htmlFor={"img" + photo.id}>
                                    <div>{photo.seq}</div>
                                    <img src={photo.dataUrl} alt="" />
                                </label>
                            </div>
                    )
                }
             </div>
            <WideButton text={"사진 불러오기"} onClick={()=>fileRef.current.click()} />
        </div>
    );
}

export default PhotoRegister;