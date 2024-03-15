import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddCourse = () => {
    const [title, settitle] =  useState<string>("")
    const [description, setdescription] =  useState<string>("")
    const nav = useNavigate();
    const props = useLocation();
    const user = props.state.user
    const goback = ()=>{
        nav("/professor", { state: { user } })
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!title || !description) {
            console.log("All fields are required");
            return;
        }
    
        console.log(user);
        try {
            const response = await axios.post(`http://localhost:3001/courses/create/${user._id}`, { title, description });
            console.log(response);
            goback();
        } catch (error) {
            console.log("Error occurred while submitting the form:", error);
        }
    };
    

  return (
    <div>
        <button className="btn btn-primary" onClick={goback}>&lt;</button>
        <h1>Add new cousre</h1>
        <form className='container' onSubmit={handleSubmit}>
        <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title</label>
                <input type="text" className="form-control" id="title" onChange={(e)=>settitle(e.target.value)}/>
            </div>   
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" onChange={(e)=>setdescription(e.target.value)}/>
            </div>                
            <button className='btn btn-primary'>Add Course</button>
        </form>
    </div>
  )
}

export default AddCourse