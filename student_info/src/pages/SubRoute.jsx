import React from 'react';
import { Route, Routes } from 'react-router-dom';

function SubRoute(props) {
  return (
    <>
    
    <h1>서브 라우트</h1>
    <Routes>
      
        <Route path='/test1' element={ <h1>Test1</h1> } />
        <Route path='/test2' element={ <h1>Test2</h1> } />
        <Route path='/test3' element={ <h1>Test3</h1> } />
    </Routes>
    </>
  );
}

export default SubRoute;