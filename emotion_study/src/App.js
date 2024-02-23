import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';
import RootLayout from './components/RootLayout/RootLayout';
import MyPage from './pages/MyPage/MyPage';


function App() {
  return (
    <>
      <Reset />
      <SideBar />
      <SideBarTop />
      <RootLayout>
        <Routes>
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/board' element={<>보드</>} />
          <Route path='/notice' element={<>공지사항</>} />
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
