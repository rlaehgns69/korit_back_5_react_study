/** @jsxImportSource @emotion/react */
import * as S from "./style";

function PhotoAlbum() {
    const storedPhotos = JSON.parse(localStorage.getItem('oldFiles')) || [];

    return (
        <div css={S.albumLayout}>
            {storedPhotos.length > 0 ? (
                storedPhotos.map((photo) => (
                    <div key={photo.id}>
                        <img src={photo.preview} alt="" />
                    </div>
                ))
            ) : (
                <h1 css={S.noPhotosText}>불러올 사진이 없습니다.</h1>
            )}
        </div>
    );
}

export default PhotoAlbum;