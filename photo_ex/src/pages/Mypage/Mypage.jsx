/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import * as S from "./style";
import defaultProfile from "../../assets/images/profile/default.jpeg"
import { useRecoilState } from "recoil";
import { mypageSubmitRefreshState } from "../../atoms/mypageSubmitRefresh";


/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */
function Mypage(props) {
    const [ nicknameValue, setNicknameValue, handleNicknameOnChange ] = useInput();
    const [ nameValue, setNameValue, handleNameOnChange ] = useInput();
    const [ birthdayValue, setBirthdayValue, handleBirthdayOnChange ] = useInput();

    const [refresh, setRefresh] = useRecoilState(mypageSubmitRefreshState);

    
    const [ profileUrl, setProfileUrl ] = useState(defaultProfile);
    
    const fileRef = useRef();

    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        if(!!localStorageUser) { /* !! ! boolean 값이 있을 때만 */
            const user = JSON.parse(localStorageUser);
            //객체가져와서 set하면되는데 (hook에서 사용)
            setNicknameValue(() => user.nickname)
            setNameValue(() => user.name)
            setBirthdayValue(() => user.birthday);
            setProfileUrl(() => user.imgUrl);
        }
    }, []);

    const handleFileChange = (e) => {
        const files = e.target.files;

        if(files.length === 0) {
            return;
        }
        const file = files[0];

        const fileReader = new FileReader();
        
        fileReader.onload = (e) => {
            setProfileUrl(() => e.target.result);
        }
        
        fileReader.readAsDataURL(file);
    }

    const handleSubmitClick = () => {
        const user = {
            nickname: nicknameValue,
            name: nameValue,
            birthday: birthdayValue,
            imgUrl: profileUrl
        }

        // 저장
        localStorage.setItem("user", JSON.stringify(user));
        alert("회원 정보를 수정하였습니다.");
        setRefresh(() => true); // refresh true 동작
        // setRefresh(refresh => !refresh); 
    }

    return (
        <div css={S.layout}>
            <div css={S.imageBox} onClick={() => fileRef.current.click()}>
                <input style={{display: "none"}} type ="file" ref={fileRef} onChange={handleFileChange}/>
                <img src={profileUrl} alt="" />
            </div>
            
            <input css={S.inputBox} type="text" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="이름" value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"완료"} onClick={handleSubmitClick}/>
        </div>
    );
}

export default Mypage;