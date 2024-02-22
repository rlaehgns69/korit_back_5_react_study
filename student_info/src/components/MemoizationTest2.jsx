import React, { useCallback } from 'react';

function MemoizationTest2({num1, num2}) { // 함수자체를 useCallBack()

  const fx1 = useCallback(() => {
    return num1 + 10000;
  }, [num1])
  // dependencies가 바뀌면 재정의 해라.
  // 원래는 함수 - 리턴값을 가져옴. - 가져와서 출력 num1이 바뀌면 num2 재정의 할 필요가 없으니까 useCallBack 함수버전 Memoization  
  // 100번 다시렌더링하면 300번
  const fx2 = useCallback(() => {
    return num2 + 20000;
  }, [num2]) 
  // 다른 지역 메모리 공간 
  // 200번-400번 되버림.
  // 100번 200번 / 300번 200번 (dependencies들어있는 애들만 렌더링 - 메모리 할당 새로 받는다.) 

  // console.log(fx1 ==fx2); false num1이 바뀌면 num2 함수 재정의 할 필요 없다. 리턴값을 바꿀 필요가 없다는 것 callBack

  // Memoizaition - useMemo, useCallBakc memoization Hook 함수
  

  
  return (
    <div>
      <h3>{fx1()}</h3>
      <h3>{fx2()}</h3>
    </div>
  );
}

export default MemoizationTest2;