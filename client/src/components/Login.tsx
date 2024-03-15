import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Style.css"
import axios from 'axios';





export const Login: React.FC = () => {

   const nav = useNavigate();
    const [email, setemail] = useState<string>("")
    const [password, setpasswordword] = useState<string>("") 


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log("went to submit");
        
        if(!email||!password){
            return;
        }

        axios.post('http://localhost:3001/user/login', {email, password})
        .then(res=>{
            if(res.data==="password is incorrect"){
                console.log("password is incorrect");
            }
            else if(res.data==="no user found"){
                console.log("no user found");
            }
            else{
                //check the role if student go to student page and if...
                const user = res.data;
                console.log(user);
                
                if(user.role==="student"){
                    nav("/student", { state: { user } })
                }
                else{
                    nav("/professor", { state: { user } })
                }
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const goToSignup = ()=>{
        nav("/register");
    }

  return (
    <div >
        <form className='container' onClick={handleSubmit}>
        <h1 className='head'>Login</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setemail(e.target.value)}/>
            </div>   
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setpasswordword(e.target.value)}/>
            </div>                
            <button className='btn btn-primary' type='submit'>Login</button>
            <button className='btn btn-primary' onClick={goToSignup}>Signup</button>
        </form>
    </div>
  )

}


export default Login;