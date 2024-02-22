import React, { useEffect, useMemo, useState } from 'react';

function MemoizationTest({num1, num2}) {

  const [ num3, setNum3 ] = useState(0); // num3 상태
  const [ tempNum5, setTempNum5 ] = useState(0);

  useEffect(() => {
    setTempNum5(num3 + 40000);
  }, [num3]);
  // num3가 바뀔 때 렌더링 1번 
  // setTempNum5 렌더링 1번
  console.log("Memoizaiton Test 렌더링");

  const tempNum1 = useMemo(() => {
    console.log("memo: num1")
    return num1 * 10;
  }, [num1]);// num1만 바꼈을 때 다시 계산

  const tempNum2 = useMemo(() => {
    console.log("memo: num2")
    return num2 + 10000;}
    , [num2]);

  const tempNum3 = useMemo(() => {
    console.log("memo: num3")
    return num3 + 20000; //결과값을 저장
  }, [num3]);  //num3가 변했을 때만

  const tempNum4 = useMemo(() => {
    console.log("memo: num4");
    return num1 + num2;
  },[num1, num2])

  return (
    <>
      <button onClick={() => setNum3(num3 + 1)}>num3증가</button>
      <h3>{tempNum1}</h3>
      <h3>{tempNum2}</h3>
      <h3>{tempNum3}</h3>
      <h3>{tempNum4}</h3>
    </>
  );
}

export default MemoizationTest;