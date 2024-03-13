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
                    //go to professor page
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
            <input className='input' type="email" name="email" id="email" placeholder='E-mail'  onChange={(e)=>setemail(e.target.value)}/>
            <input className='input' type="password" name="passwor" id="password" placeholder='password' onChange={(e)=>setpasswordword(e.target.value)}/>
            <button className='btn' type='submit'>Login</button>
            <button className='btn' onClick={goToSignup}>Signup</button>
        </form>
    </div>
  )

}


export default Login;