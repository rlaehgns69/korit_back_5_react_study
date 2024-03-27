/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { useQuery, useQueryClient } from 'react-query';
import Select from 'react-select';
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { getBookCountRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import AdminBookSearchPageNumbers from "../AdminBookSearchPageNumbers/AdminBookSearchPageNumbers";

function AdminBookSearch({ selectStyle, bookTypeOptions, categoryOptions }) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const searchCount = 20;
    const [ bookList, setBookList ] = useState([]);

    const searchBooksQuery = useQuery(
      ["searchBooksQuery", searchParams.get("page")],//1.키값
      async() => await searchBooksRequest({
          page: searchParams.get("page"),
          count: searchCount,
          bookTypeId: selectedBookType.option.value,
          categoryId: selectedCategory.option.value,
          searchTypeId: selectedSearchType.option.value,
          searchText: searchText.value
      }), // 2. request(api)
      {
      //3. 옵션
        refetchOnWindowFocus: false,
        onSuccess: response => {
          // console.log(response);
          setBookList(() => response.data.map(book => {
            return {
              ...book,
              checked: false
            }
          }));
        },
        retry: 0
      }
    );

    const getBookCountQuery = useQuery(
      ["getBookCountQuery", searchBooksQuery.data],//1.키값-검색한결과가 바뀌면 count가져옴.
      async() => await getBookCountRequest({
          count: searchCount,
          bookTypeId: selectedBookType.option.value,
          categoryId: selectedCategory.option.value,
          searchTypeId: selectedSearchType.option.value,
          searchText: searchText.value
      }), // 2. request(api)
      {
      //3. 옵션
      
        refetchOnWindowFocus: false,
        onSuccess: response => {
          
          console.log(response);
        },
        retry: 0
      }
    );

    const searchSubmit = () => {
      setSearchParams({
        page: 1
      })
      searchBooksQuery.refetch();
      // console.log([
      //   selectedBookType.option.value,
      //   selectedCategory.option.value,
      //   selectedSearchType.option.value
      // ])
    }
    

    const selectedBookType = useReactSelect({value: 0, label: "전체"});
    const selectedCategory = useReactSelect({value: 0, label: "전체"});
    const selectedSearchType = useReactSelect({value: 0, label: "전체"});
    const searchText = useBookRegisterInput(searchSubmit);


    const searchTypeOptions = [
      {value: 0, label: "전체"},
      {value: 1, label: "도서명"},
      {value: 2, label: "저자명"},
      {value: 3, label: "출판사"},
      {value: 4, label: "ISBN"},
    ];

    const selectStyle2 = {
      control: baseStyles => ({
        ...baseStyles,
        borderRadius: "0px",
        border:"none",
        borderRight: "1px solid #dbdbdb",
        outline:"none",
        boxShadow: "none"
      })
  }

   // 전체 선택 기능 구현
   const handleAllCheckChange = (e) => {
    const isChecked = e.target.checked;
    const updatedBookList = bookList.map(book => ({
      ...book,
      checked: isChecked
    }));
    setBookList(updatedBookList);
  }

  // 개별 선택 기능 구현
const handleCheckOnChange = (e) => {
  const bookId = e.target.value;
  const isChecked = e.target.checked; // 체크박스의 상태값을 가져옵니다.

  // 해당 bookId를 가진 도서의 checked 값을 변경합니다.
  const updatedBookList = bookList.map(book => {
    if (book.bookId === bookId) {
      return {
        ...book,
        checked: isChecked
      };
    }
    return book;
  });

  // 변경된 bookList를 상태로 설정합니다.
  setBookList(updatedBookList);
}

  return (
    <div>
        <div css={s.searchBar}>
            <Select 
                styles={selectStyle2} 
                options={[{value: 0, label: "전체"} , ...bookTypeOptions]} 
                defaultValue={selectedBookType.defaultValue}
                value={selectedBookType.option}
                onChange={selectedBookType.handleOnChange}
            />
            <Select 
                styles={selectStyle2} 
                options={[{value: 0, label: "전체"} , ...categoryOptions]} 
                defaultValue={selectedCategory.defaultValue}
                value={selectedCategory.option}
                onChange={selectedCategory.handleOnChange}
            />
            <Select 
                styles={selectStyle} 
                options={searchTypeOptions} 
                defaultValue={searchTypeOptions.defaultValue}
                value={selectedSearchType.option}
                onChange={selectedSearchType.setOption}
            />
            <input 
                css={s.searchInput} 
                type="text"
                value={searchText.value}
                onChange={searchText.handleOnChange}
                onKeyDown={searchText.handleOnKeyDown} 
            />
            <button css={s.searchButton} onClick={()=> searchSubmit()}>검색</button>
        </div>

        <div css={s.tableLayout}>
          <table css={s.table}>
            <thead>
              <tr css={s.theadTr}>
                <th><input type="checkbox" onChange={handleAllCheckChange} /></th>
                <th>코드번호</th>
                <th>도서명</th>
                <th>저자명</th>
                <th>출판사명</th>
                <th>ISBN</th>
                <th>도서형식</th>
                <th>카테고리</th>
                <th>표지URL</th>
              </tr>
            </thead>
            <tbody>
              {
                bookList.map(
                  (book, index) =>
                  <tr key={book.bookId}>
                      <td><input type="checkbox" value={book.bookId} checked={book.checked} onChange={handleCheckOnChange} /></td>
                      <td>{book.bookId}</td>
                      <td>{book.bookName}</td>
                      <td>{book.authorName}</td>
                      <td>{book.publisherName}</td>
                      <td>{book.isbn}</td>
                      <td>{book.bookTypeName}</td>
                      <td>{book.categoryName}</td>
                      <td>{book.coverImgUrl}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        {
          !getBookCountQuery.isLoading &&
          <AdminBookSearchPageNumbers bookCount={getBookCountQuery.data?.data} />
        }
    </div>
  );
}

export default AdminBookSearch;