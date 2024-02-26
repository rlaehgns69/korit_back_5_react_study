import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarTop from './components/SideBarTop/SideBarTop';
import RootLayout from './components/RootLayout/RootLayout';
import MyPage from './pages/MyPage/MyPage';
import { MENUS } from './constants/menu';


function App() {
  return (
    <>
      <Reset />
      <SideBar />
      <SideBarTop />
      <RootLayout>
        <Routes>
          {MENUS.map(menu => <Route path={menu.path} element={menu.element} />)}
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
