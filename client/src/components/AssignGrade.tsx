import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AssignGrade = () => {
    const props = useLocation();
    const [grade, setgrade] = useState("")
    const student = props.state.studentId;
    const courseobj = props.state.course;
    const nav = useNavigate();
    const user = props.state.user;
    const goBack = () => {
        nav("/professor", { state: { user } });
    };
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        
        try {
            const course = courseobj._id
            const response = await axios.post(`http://localhost:3001/grades/assign`,{student, course, grade});
            console.log(response);
            goBack();
        } catch (error) {
            console.log("Error occurred while submitting the form:", error);
        }
    };





  return (
    <div>
        <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Assign grade</label>
                    <input type="number" className="form-control" id="title" min={0}
                        max={100} onChange={(e) => setgrade(e.target.value)} />
                </div>
                <button className='btn btn-primary'>edit</button>
            </form>
    </div>
  )
}

export default AssignGrade