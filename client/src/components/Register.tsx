import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../Style.css"

export const Register = () => {

    const history = useNavigate();

    const [firstName, setfirstName] = useState<string>("")
    const [lastName, setlastName] = useState<string>("")
    const [email, setemail] = useState<string>("")
    const [password, setpasswordword] = useState<string>("") 
    const [role, setRole] = useState<string>("student"); 

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        
        // Add your form submission logic here
        if(!email||!firstName||!lastName||!password){
            console.log("all fields are required");
            return;
        }
        axios.post('http://localhost:3001/user/create', {email, firstName, lastName,  password, role}).
        then(response=>{
            console.log(response);
            setemail("");
            setfirstName("");
            setlastName("");
            setpasswordword("");
            setRole("student");
            history("/");
        })
        .catch(error=>{
            console.log(error);
        })
      };


  return (
    <div>
        <form onSubmit={handleSubmit} className="container">
        <h1 className="head">Register</h1>
            <input className="input" type="email" name="email" id="email" placeholder='E-mail'  onChange={(e)=>setemail(e.target.value)}/>
            <input className="input" type="text" name="first-name" id="first-name" placeholder='first-name' onChange={(e)=>setfirstName(e.target.value)}/>
            <input className="input" type="text" name="last-name" id="last-name" placeholder='last-name' onChange={(e)=>setlastName(e.target.value)}/>
            <input className="input" type="passwordword" name="passwordword" id="password" placeholder='passwordword' onChange={(e)=>setpasswordword(e.target.value)}/>
            <div className='buttons'>
            <div>
                    <input type="radio" id="student" name="role" value="student" checked={role === "student"} onChange={() => setRole("student")} />
                    <label htmlFor="student">Student</label>
                </div>
                <div>
                    <input type="radio" id="professor" name="role" value="professor" checked={role === "professor"} onChange={() => setRole("professor")} />
                    <label htmlFor="professor">Professor</label>
                </div>
            </div>
            <button className="btn" type="submit">Register</button>
        </form>
    </div>
  )
}


export default Register;