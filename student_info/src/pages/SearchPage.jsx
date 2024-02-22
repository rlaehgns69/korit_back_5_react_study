import React, { useMemo } from 'react';

function SearchPage(props) {
  const categorys = useMemo(() => [
      {
        categoryId: 0,
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
  
  const bookObj = useMemo(() => [
    {
    bookId: 0,
    bookName: "책",
    categoryId: 0
    }
],[]);//[searhdata]
  
  const [ books, setBooks ] = useState([

  ]);

  return (
    <div>
      
    </div>
  );
}

export default SearchPage;