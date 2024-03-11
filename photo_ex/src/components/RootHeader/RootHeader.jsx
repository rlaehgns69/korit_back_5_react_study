/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useRecoilState } from "recoil";
import { mypageSubmitRefreshState } from "../../atoms/mypageSubmitRefresh";
import { useEffect, useState } from "react";

function RootHeader() {

    const [ profileImage, setProfileImage ] = useState(defaultImg);
    const [ refresh, setRefresh ] = useRecoilState(mypageSubmitRefreshState);

    useEffect(() => {
        if(refresh) {
            const localStorageUser = localStorage.getItem("user");
            if(!localStorageUser) {
                return;
            }
            const user = JSON.parse(localStorageUser);
            setProfileImage(() => user.imgUrl);
            setRefresh(() => false);//toggle
        }
    }, [refresh]);

    // useEffect(()=>{
    //     const localStorageUser = localStorage.getItem("user");
    //     if(!localStorageUser) {
    //         return;
    //     }
    //     const user = JSON.parse(localStorageUser);
    //     setProfileImage(()=>user.imgUrl);
    // }, [refreshA, refreshB])

    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>
                <img src={profileImage} alt="" />
            </Link>
        </div>
    );
}

export default RootHeader;