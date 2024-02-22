import logo from './logo.svg';
import './App.css';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Reset />
      <SideBar />
      <Routes>
        
        <Route path='/mypage' element={<>마이페이지</>} />
        <Route path='/board' element={<>보드</>} />
        <Route path='/notice' element={<>공지사항</>} />
        
        
      </Routes>
    </>
  );
}

export default App;
