/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef, useState } from "react";

function PhotoRegister(props) {
    const uploadFilesId = useRef(0);
    const imgFileRef = useRef();
    const [oldFiles, setOldFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([]);

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles")
            ? []
            : JSON.parse(localStorage.getItem("oldFiles")));
    }, []);

    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);
        if (loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }
        const uploadFiles = loadFiles.map(file => {
            return {
                id: uploadFilesId.current += 1,
                imageUrl: file
            };
        });
        uploadFilesId.current = 0;
    
        let promises = [];
    
        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result);
            };
            fileReader.readAsDataURL(file.imageUrl);
        }));
        Promise.all(promises)
            .then(result => {
                const updatedFiles = result.map((dataUrl, index) => ({
                    ...uploadFiles[index],
                    preview: dataUrl
                }));
    
                setNewFiles(updatedFiles);
    
                // Confirm message
                const userConfirmed = window.confirm("이미지를 저장하시겠습니까?");
    
                if (userConfirmed) {
                    // Save updatedFiles to localStorage or perform other actions as needed
                    localStorage.setItem("oldFiles", JSON.stringify([...oldFiles, ...updatedFiles]));
                    alert("이미지가 성공적으로 저장되었습니다.");
                } else {
                    // Clear newFiles if the user cancels
                    setNewFiles([]);
                    alert("이미지 저장이 취소되었습니다.");
                }
            });
    };

    return (
        <div css={S.layout}>
            {oldFiles?.map(file => (
                <div key={file.id}>
                    <img src={file.imageUrl} alt="" />
                </div>
            ))}
            {newFiles?.map(file => (
                <div key={file.id}>
                    <img src={file.preview} alt="" />
                </div>
            ))}
            <h1 css={S.title}>사진 등록하기</h1>
            <input type="file" style={{ display: "none" }} multiple={true} ref={imgFileRef} onChange={handleFileChange} />
            <WideButton text={"사진 불러오기"} onClick={() => imgFileRef.current.click()} />
        </div>
    );
}

export default PhotoRegister;