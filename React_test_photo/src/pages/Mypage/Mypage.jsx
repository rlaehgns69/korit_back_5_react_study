/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import * as S from "./style";
import defaultProfile from "../../assets/images/profile/default.jpeg"


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
    const [ nicknameValue, handleNicknameOnChange ] = useInput();
    const [ nameValue, handleNameOnChange ] = useInput();
    const [ birthdayValue, handleBirthdayOnChange ] = useInput();
    const [ profileUrl, setProfileUrl ] = useState(defaultProfile);
    const userInfo = {
        nickname:nicknameValue,
        name:nameValue,
        birthday:birthdayValue,
        imgUrl:profileUrl,
        
    };
    const imgFileRef = useRef(0);


    const handleImgFileChange = (e) => {
        const fileReader = new FileReader();

        if(e.target.files.length === 0){
            return;
        }

        fileReader.onload = (e) => {
            setProfileUrl(e.target.result);
        };

        fileReader.readAsDataURL(e.target.files[0]);
    }
    const handleImageUpload = () => {
        const updatedUserInfo = {
            ...userInfo,
        }
        localStorage.setItem('user', JSON.stringify(updatedUserInfo));
        alert("사용자 정보가 성공적으로 수정되었습니다.")
    };
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('user');

        if (storedUserInfo) {
            const { nickname, name, birthday, imgUrl } = JSON.parse(storedUserInfo);

            handleNicknameOnChange({ target: { value: nickname } });
            handleNameOnChange({ target: { value: name } });
            handleBirthdayOnChange({ target: { value: birthday } });
            setProfileUrl(imgUrl || defaultProfile);
        }
      }, []); 

    return (
        <div css={S.layout}>
            <div css={S.imageBox} onClick={() => imgFileRef.current.click()}>
                <img src={profileUrl} alt="" />
                <input style={{display:"none"}} 
                    type="file" 
                        ref={imgFileRef} 
                            onChange={handleImgFileChange} />
            </div>
            
            <input css={S.inputBox} type="text" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="이름" value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"수정하기"} onClick={handleImageUpload}/>
        </div>
    );
}

export default Mypage;