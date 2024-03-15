import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogutButton from "./LogutButton";

const ProfessorPage = () => {

    const nav = useNavigate();
    const [Courses, setcourses] = useState<any[]>([]);

    const props = useLocation();
    const user = props.state.user

    const gotoAddCourse= ()=>{
        nav("/create_course", { state: { user } })
    }




    const handleCourseInfo = (index:number)=>{
        const course = Courses[index]
        console.log(course);
        
        nav("/course_info", { state: { course, user } })
    }



    const handleDelete= (index:number)=>{
        const course = Courses[index]
        axios.delete(`http://localhost:3001/courses/${course._id}`)
        .then(res=>{
            console.log(res.data);
            window.location.reload();
            
        })
        .catch(error=>{
            console.log(error);
        })
    }

useEffect(()=>{
    const fetchallcourses= async ()=>{
        const response = await axios.get('http://localhost:3001/courses');
        const allCourses = response.data;
        const myCourses = allCourses.filter((course: { professor: any; })=>{
            return course.professor==user._id;
        })
        setcourses(myCourses);
    }
    fetchallcourses();
})


  return (
    <div>
        <LogutButton/>
        <h1>Professor Page</h1>
        <div>
            <button className="btn btn-primary" onClick={gotoAddCourse}>Add Course</button>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">course name</th>
                <th scope="col">options</th>
                </tr>
            </thead>
            <tbody>
                {
                    Courses.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.title}</td>
                        <td><button className="btn btn-primary" onClick={()=>handleCourseInfo(index)}>info</button> <button className="btn btn-primary" onClick={()=>handleDelete(index)}>delete course</button></td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    </div>  
  )
}

export default ProfessorPage