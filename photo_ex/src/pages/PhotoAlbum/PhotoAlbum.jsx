/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as S from "./style";
/**
 *  1. 사진 등록하기를 통해 등록된 이미지들을 각자 자유롭게 디자인하여 불러와야함.
 *  2. localStorage에 저장된 사진이 없으면 
 *      <h1>불러올 사진이 없습니다.<h1>
 *      문구가 중앙에 나오도록해야함.
 */

function PhotoAlbum() {
    // 데이터는 localStorage에 있으니까 뿌려주면 된다.
    const [ loadPhotos, setLoadPhotos ] = useState([]);
    
    useEffect(() => {
        //배열 생성
        const localStorageFiles = !localStorage.getItem("photo") 
                                        ? [] // 비었으면 빈배열 
                                        //JSON변환
                                        //값이 있으면 
                                        : JSON.parse(localStorage.getItem("photo"));
        
        setLoadPhotos(() => localStorageFiles);
    }, []);// 최초한번 이페이지 로드됐을 때 실행

    // 상태 변화 useState
    return (
        <div css={S.layout}>
            {loadPhotos.map(
                (photo) =>//photo id imageUrl
                    <div key={photo.id} css={S.imageCard}>
                        <div css={S.imageBox}>
                            <img src={photo.imageUrl} alt="" />
                        </div>
                    </div>
            )}
        </div>
    );
}

export default PhotoAlbum;