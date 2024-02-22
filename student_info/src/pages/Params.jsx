import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Params(props) {
  const [ params ] =useSearchParams();

  const data = params.get("data");
  const data2 = params.get("data2");
  
  return (
    <div>
        <h3>{data}</h3>    
        <h3>{data2}</h3>    
    </div>
  );
}

export default Params;