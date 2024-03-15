import Register from "./components/Register";
import Login from "./components/Login";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import StudentPage from "./components/StudentPage";
import ProfessorPage from "./components/ProfessorPage";
import AddCourse from "./components/AddCourse";
import CourseInfo from "./components/CourseInfo";
import AssignGrade from "./components/AssignGrade";

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/student" element={<StudentPage/>}></Route>
      <Route path="/professor" element={<ProfessorPage/>}></Route>
      <Route path="/create_course" element={<AddCourse/>}></Route>
      <Route path="/course_info" element={<CourseInfo/>}></Route>
      <Route path="/assign_grade" element={<AssignGrade/>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
  
}

export default App;