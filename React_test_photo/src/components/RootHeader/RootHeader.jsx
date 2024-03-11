/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useEffect, useState } from "react";

function RootHeader() {
    // const[img, setImg] = useState(defaultImg);
    
    // useEffect(() => {
    //     if (!!localStorage.getItem("user")) {
    //         setImg(localStorage.getItem("user").imgUrl);
    //     }
    // }, []); 

    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>
                <img src={defaultImg} alt="" />
            </Link>
        </div>
    );
}

export default RootHeader;