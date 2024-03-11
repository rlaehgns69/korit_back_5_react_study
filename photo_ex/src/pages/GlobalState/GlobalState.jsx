import React, { useState } from 'react';
import Component1 from './components/Component1/Component1';
import { inputState } from './atoms/inputState';
import { useRecoilState } from 'recoil';

function GlobalState() {
  const [ value ] = useRecoilState(inputState);
  // 여기서 정의한게 아니고 
  // atoms의 상태를 가지고 오곘다.

  return (
    <div>
      <h1>{value}</h1>
      <Component1  />
    </div>
  );
}

export default GlobalState;