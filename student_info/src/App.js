import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Memoization from "./pages/Memoization";
import StudentArrayPage from "./pages/StudentArrayPage";
import StudentArrayPage2 from "./pages/StudentArrayPage2";
import StudentArrayPage3 from "./pages/StudentArrayPage3";
import StudentPage from "./pages/StudentPage";
import { useState } from "react";
import Params from "./pages/Params";
import SearchPage from "./pages/SearchPage";

function App() {
 const [ value, setValue] = useState("");
 
  return (
  // <StudentPage />
  // <StudentArrayPage />
  // <StudentArrayPage2 />
  // <StudentArrayPage3 />
  <>
    <input type="text" onChange={(e) => setValue(e.target.value)} />
    <ul>
      <Link to="/memoization"><li>메모이제이션</li></Link>
      <Link to="/st"><li>학생정보</li></Link>
      <Link to="/sta1"><li>학생들정보1</li></Link>
      <Link to="/sta1"><li>학생들정보1</li></Link>
      <Link to={`/p?data=${value}`}><li>파람스</li></Link>
    
    </ul>
    <Routes>
      <Route path="/memoization" element={ <Memoization />} />
      <Route path="/st" element={ <StudentPage />} />
      <Route path="/sta1" element={ <StudentArrayPage />} />
      <Route path="/sta3" element={ <StudentArrayPage3 />} />
      <Route path="/p" element={ <Params />} />
      <Route path="/books" element={ <SearchPage />} />
    </Routes>
  </>
  
  ); 
}
export default App;