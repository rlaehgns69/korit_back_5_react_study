/** @jsxImportSource @emotion/react */
import Select from "react-select"
import BookRegisterInput from "../../../components/BookRegisterInput/BookRegisterInput";
import * as s from "./style";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { useMutation, useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegisterInput } from "../../../hooks/useBookRegisterInput";
import { storage } from "../../../apis/firebase/config/fireBaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import RightTopButton from "../../../components/RightTopButton/RightTopButton";
import { registerBook } from "../../../apis/api/bookApi";
import AdminBookSearch from "../../../components/AdminBookSearch/AdminBookSearch";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../../atoms/adminSelectedBookAtom";


function BookManagement(props) {

    //booktypeOption 옵션
    const [ bookTypeOptions, setBookTypeOptions ] = useState([]);
    const [ categoryOptions, setBookCategoryOptions ] = useState([]);
    const fileRef = useRef();
    const inputRefs = [
      useRef(), // 0 bookId
      useRef(), // 1 isbn
      useRef(), // 2 도서형식
      useRef(), // 3 카테고리
      useRef(), // 4 도서명
      useRef(), // 5 저자명
      useRef(), // 6 출판사
      useRef()  // 7 URL
    ];// ref state에 안넣어도됨. 이름겹쳐서 한거였음.
    const bookTypeQuery = useQuery(
      ["bookTypeQuery"], 
      getAllBookTypeRequest,
      {
        onSuccess: response => {
          setBookTypeOptions(() => response.data.map(bookType => {
            return {
              value: bookType.bookTypeId,
              label: bookType.bookTypeName
            }
          }));//response안에 있는 데이터가 리스트
        },
        retry: 0,
        refetchOnWindowFoucus: false
      }  
    );
    
    const categoryQuery = useQuery(
      ["categoryQuery"], 
      getAllCategoryRequest,
      {
        onSuccess: response => {
          setBookCategoryOptions(() => response.data.map(category => {
            return {
              value: category.categoryId,
              label: category.categoryName
            }
          }));
        },
        retry: 0,
        refetchOnWindowFoucus: false
      }  
    );

    const registerBookMutation = useMutation({
      mutationKey: "registerBookMutation",
      mutationFn: registerBook,
      onSuccess: response => {

      },
      onError: error => {

      }
    });// List가져올건데 success가 되면 get하는거 useQuery 맨처음 refresh 저장하는 순간 한번더 refresh 수동적으로

    // console.log(inputRefs)

    const nextInput = (ref) => {
      // console.log(ref);
      ref.current.focus();
    };

    const submit = (value) => {
      registerBookMutation.mutate({
        isbn: isbn.value,
        bookTypeId: bookTypeId.value,
        categoryId: categoryId.value,
        bookName: bookName.value,
        authorName: authorName.value,
        publisherName: publisherName.value,
        coverImgUrl: imgUrl.value
      }); 
    }
      
      // key - value dto로 들어감 (dto를 기준으로 입력)
      // 저장 요청
      // console.log([
      //   bookId.value,
      //   isbn.value,
      //   bookTypeId.value,
      //   categoryId.value,
      //   bookId.value,
      //   authorName.value,
      //   publisherName.value,
      //   imgUrl.value
      //])//데이터 전송모양 key value 객체화 백엔드로 요청
    

    const bookId = useBookRegisterInput(nextInput, inputRefs[1]);//수정할때만 필요
    const isbn = useBookRegisterInput(nextInput, inputRefs[2]); // isbn 2번 (isbn안에 들어있는 onKeyDown enter가 일어나면 nextInput가라 도서형식 ref2번)
    //중간에 2개 select box
    const bookTypeId = useBookRegisterInput(nextInput, inputRefs[3]);
    const categoryId = useBookRegisterInput(nextInput, inputRefs[4]);
    const bookName = useBookRegisterInput(nextInput, inputRefs[5]);
    const authorName = useBookRegisterInput(nextInput, inputRefs[6]);
    const publisherName = useBookRegisterInput(nextInput, inputRefs[7]);
    
    const imgUrl = useBookRegisterInput(submit);
    const [selectedBook] = useRecoilState(selectedBookState);

    useEffect(() => {
        bookId.setValue(() => selectedBook.bookId)
        isbn.setValue(() => selectedBook.isbn)
        bookTypeId.setValue(() => ({value:selectedBook.bookTypeId, label: selectedBook.bookTypeName}));
        categoryId.setValue(() => ({value:selectedBook.categoryId, label: selectedBook.categoryName}));
        bookName.setValue(() => selectedBook.bookName)
        publisherName.setValue(() => selectedBook.publisherName)
        imgUrl.setValue(() => selectedBook.coverImgUrl)
    }, [selectedBook]);

    // console.log();
    
    

    const selectStyle = {
        control: baseStyles => ({
          ...baseStyles,
          borderRadius: "0px",
          border:"none",
          outline:"none",
          boxShadow: "none"
        })
    }

    const handleFileChange = (e) => {
    
      const files = Array.from(e.target.files);

      if(files.length === 0) {
        e.target.value = ""; // 파일 선택 e.target.value 마지막 파일명 취소 누르면 변경사항 x 오류 (비워라)
        return;
      }

      if(!window.confirm("파일을 업로드 하시겠습니까?")) {
        e.target.value="";
        return;
      }

      const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {},
        () => {
          alert("업로드를 완료하셨습니다.");
          getDownloadURL(storageRef)
          .then(url => {
            imgUrl.setValue(() => url);
          });
        }
      ) 
    }

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>도서 관리</h1>
        <RightTopButton onClick={submit}>확인</RightTopButton>
      </div>
      <div css={s.topLayout}>
            <table css={s.registerTable}>
              <tbody>
                <tr>
                  <th css={s.registerTh}>도서코드</th>
                  <td>
                    <BookRegisterInput 
                        value={bookId.value} 
                        bookref={inputRefs[0]}
                        onChange={bookId.handleOnChange}
                        onKeyDown={bookId.handleOnKeyDown}
                    />
                  </td>
                  <th css={s.registerTh}>ISBN</th>
                  <td>
                      <BookRegisterInput 
                          value={isbn.value} 
                          bookref={inputRefs[1]}
                          onChange={isbn.handleOnChange}
                          onKeyDown={isbn.handleOnKeyDown}
                      />
                  </td>
                  <td rowSpan={5} css={s.preview}>
                    <div css={s.imageBox}>
                        <img src={
                          !imgUrl.value 
                          ? "data:image/png;base64,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"
                          : imgUrl.value
                        } alt="" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th css={s.registerTh}>도서형식</th>
                  <td>
                    <Select 
                      styles={selectStyle} 
                      options={bookTypeOptions}
                      value={bookTypeId.value.value}// 1 2 3 4
                      inputValue={bookTypeId.value.label} // label- text
                      onKeyDown={bookTypeId.handleOnKeyDown}
                      onChange={bookTypeId.handleOnChange}
                      ref={inputRefs[2]}
                    /> 
                  </td>
                  <th css={s.registerTh}>카테고리</th>
                  <td>
                    <Select 
                      styles={selectStyle} 
                      options={categoryOptions}
                      value={categoryId.value.value}
                      inputValue={categoryId.value.label}
                      onKeyDown={categoryId.handleOnKeyDown}
                      onChange={categoryId.handleOnChange}
                      ref={inputRefs[3]}
                    /> 
                  </td>
                </tr>
                <tr>
                  <th css={s.registerTh}>도서명</th>
                  <td colSpan={3}>
                      <BookRegisterInput 
                          value={bookName.value} 
                          bookref={inputRefs[4]}
                          onChange={bookName.handleOnChange}
                          onKeyDown={bookName.handleOnKeyDown}
                      />
                  </td>
                </tr>
                <tr>
                  <th css={s.registerTh}>저자명</th>
                  <td>
                      <BookRegisterInput 
                          value={authorName.value} 
                          bookref={inputRefs[5]}
                          onChange={authorName.handleOnChange}
                          onKeyDown={authorName.handleOnKeyDown}
                      />
                  </td>
                  <th css={s.registerTh}>출판사</th>
                  <td>
                      <BookRegisterInput 
                          value={publisherName.value} 
                          bookref={inputRefs[6]}
                          onChange={publisherName.handleOnChange}
                          onKeyDown={publisherName.handleOnKeyDown}
                      />
                  </td>
                </tr>
                <tr>
                  <th css={s.registerTh}>표지URL</th>
                  <td colSpan={3}>
                    <div css={s.imgUrl}>
                      <span css={s.imgUrlBox}>
                        <BookRegisterInput 
                          value={imgUrl.value} 
                          bookref={inputRefs[7]}
                          onChange={imgUrl.handleOnChange}
                          onKeyDown={imgUrl.handleOnKeyDown}
                        />
                      </span>
                      <input 
                        type="file" 
                        style={{
                          display: "none"
                        }}
                        onChange={handleFileChange}
                        ref={fileRef} 
                      />
                        <button css={s.imgAddButton} onClick={() => fileRef.current.click()}>
                            <CiSquarePlus />
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <AdminBookSearch
              selectStyle={selectStyle}
              bookTypeOptions={bookTypeOptions}
              categoryOptions={categoryOptions}
              
        />
    </div>
  );
}

export default BookManagement;