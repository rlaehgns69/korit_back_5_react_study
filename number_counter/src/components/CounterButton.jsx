//rsf
import React from 'react';

function CounterButton({ title, onClick }) {
  
  return (
      <button onClick={ onClick }>{ title }</button>
  ); // html onClick button태그의 이벤트
}

export default CounterButton;
