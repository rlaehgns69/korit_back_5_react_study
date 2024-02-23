import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';


function App() {
  return (
    <>
      <Reset />
      <SideBarTop />
      <Routes>
        
        <Route path='/mypage' element={<>마이페이지</>} />
        <Route path='/board' element={<>보드</>} />
        <Route path='/notice' element={<>공지사항</>} />
        
        
      </Routes>
    </>
  );
}

export default App;
