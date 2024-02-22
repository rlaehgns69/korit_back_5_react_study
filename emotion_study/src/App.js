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
        
        <Route />
        <Route />
        <Route />
        
      </Routes>
    </>
  );
}

export default App;
