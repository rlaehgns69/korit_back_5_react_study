import { useMemo } from "react";

export function useLoadList() {
  
  const boardList = useMemo(() => {
    const isBoardList = localStorage.getItem("boardList");
    return !isBoardList ? [] : JSON.parse(isBoardList);
  }, []);

  const lastIndex = boardList.length -1;
  const firstId = lastIndex < 0 ? 0 : boardList[0].boardId;
  const lastId = lastIndex < 0 ? 0 : boardList[lastIndex].boardId;
  const size = boardList.length;

  return { boardList, size, firstId, lastId };
}// 보드 리스트 전체를 가져올 때

// 현재 몇번째 페이지에 들어있는지(페이지번호)

//만약 1번페이지 들어와있으면 1번부터 5번(start 1 end 5)
// 만약 6번 7번 (6~10)
// pageNumber(string) /board/list?page=1
// 페이지번호가 바뀜에 따라 새로 가져옴.
export function useLoadListByPageNumber(page) {
  const pageNumber =parseInt(page);
  console.log(page)
  
  // 문제 전체리스트 개수에서
  const loadBoardList = useMemo(() => {
    const lsBoardList = localStorage.getItem("boardList");
    const loadBoardList = !lsBoardList ? [] : JSON.parse(lsBoardList);
    return loadBoardList;
    // [].filter(); 조건이 참인녀석들 필터 board(인덱스 순서) 참인 보드들만
  }, [page]);
  // 게시글 203개 페이지에 맞는것들만 1페이지 10개

  const boardList = loadBoardList.filter((board, index) => index > (pageNumber * 10) - 11 && index < pageNumber * 10 ); //id 번호 x index번호

  const size = loadBoardList.length; //전체에서 페이지 가져와야하니까 전체랑 부분
  // 보드리스트 다들고 오고
  // total 개수
  // useMemo 첨에 가져온다. 렌더링 한번
  // 페이지번호 바꼈을 때 새로 들고 와라.
  // 다른 값이 바뀔 수 가 없음.(pageNumber만)
  // pageNumber === string parsing

  // 검색어, onChange
  // 지금상황에서는 useMemo 의미 없다.메모리상 
  // const pageNumber = parseInt(page);

  

  const totalpageCount = Math.floor(size % 10 === 0 ? size / 10: (size / 10) + 1 ); // 20.3 -> 21 round 반올림 floor절삭
  const startPageNumber = pageNumber % 5 === 0 ? pageNumber - 4 : (pageNumber - (pageNumber % 5)) + 1;
  const endPageNumber = startPageNumber + 4 <= totalpageCount ? startPageNumber + 4 : totalpageCount; //만약에 21번 페이지까지면(25페이지- 21까지)
  // startPage가 바뀔때
  let pageNumbers =  useMemo(() => {
    let newpageNumbers = [];

    for(let i = startPageNumber; i <= endPageNumber; i++){
      newpageNumbers=[...newpageNumbers, i];
    }

    return newpageNumbers;
  }, [startPageNumber]);
  // for(let i = startPageNumber; i < endPageNumber; i++) {
  //   pageNumbers = [...pageNumbers, i];
  // }

  return { boardList, size, pageNumbers, totalpageCount, startPageNumber, endPageNumber };
}