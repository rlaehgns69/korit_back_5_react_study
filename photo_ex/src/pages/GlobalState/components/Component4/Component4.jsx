import React from 'react';
import { useRecoilState } from 'recoil';
import { inputState } from '../../atoms/inputState';

function Component4() {
  // const [value, setValue] = useStae(""); 얘가 globalState에
  const [ value, setValue ] = useRecoilState(inputState);
  // props를 넘겨주지않는다. useState처럼 사용 어느위치에 있던 상관이 없다.
  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(() => e.target.value)} />
    </div>
  );
}

export default Component4;