import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchPage(props) {
  const [ params ] = useSearchParams();
  const bookName = params.get("bookName");
  const categoryName = params.get("categoryName");

  const categories = useMemo(() => [
      {
        categoryId: 1,
        categoryName: "역사"
      },
      {
        categoryId: 2,
        categoryName: "문학"
      },
      {
        categoryId: 3,
        categoryName: "컴퓨터"
     }
  ], []); // useMemo function이 배열 재렌더링 안됨. 최초 한번만. 렌더링될때마다 
  // 대입을 안함. props 받은것도 아니고 state도 아님.
  
//   const bookObj = useMemo(() => [
//     {
//     bookId: 0,
//     bookName: "책",
//     categoryId: 0
//     }
// ],[]);//[searhdata]
  
//   const [ books, setBooks ] = useState([
    
//     }
//   ]);
  const books = useMemo(()=>[
    {
      booksId: 1,
      bookName: "java 역사",
      categoryId: 1
    },
    {
      booksId: 2,
      bookName: "컴퓨터 역사",
      categoryId: 1
    },
    {
      booksId: 3,
      bookName: "소설 역사",
      categoryId: 1
    },
    {
      booksId: 4,
      bookName: "문학이란",
      categoryId: 2
    },
    {
      booksId: 5,
      bookName: "역사를 말하다",
      categoryId: 2
    },
    {
      booksId: 6,
      bookName: "컴퓨터 기초",
      categoryId: 3
    },
    {
      booksId: 7,
      bookName: "java 기초 프로그래밍",
      categoryId: 3
    },
  ].filter(book => book.bookName.includes(bookName) // 7개 책중에 책이름이 포함되어있는지 참이면 새로운 배열에 책(객체) 담아라. 
    || book.categoryId === categories.filter(category => category.categoryName === categoryName)[0]?.categoryId) //또는 책.카테고리아이디 === categoryName[0].categoryId랑 같은 책 categoryId만 넣어라. (카테고리이름 불가 categories.filter 카테고리이름)
    ,[bookName, categoryName]); // dependencies DB where select like문쓸예정
    // 리턴에 새로운 배열 ? 데이터가 있으면 참조를 해라.
  // params.get("bookName"), params.get("categoryName") 변수

  return (
    <div>
        <thead>
            <tr>
                <th>책번호</th>
                <th>제목</th>
                <th>카테고리번호</th>
                <th>카테고리명</th>
            </tr>
        </thead>
        <tbody>
            {books.map(book =>(
                <tr>
                  <td>{book.booksId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.categoryId}</td>
                  <td>{categories.filter(category => category.categoryId === book.categoryId)[0].categoryName}</td>
                </tr>
            ))}
        </tbody>
    </div>
  );
}

export default SearchPage;