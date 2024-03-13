import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import StudentPage from "./components/StudentPage";

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/student" element={<StudentPage/>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
  
}

export default App;