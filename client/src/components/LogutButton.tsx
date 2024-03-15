import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
    const nav = useNavigate()
    const logout = ()=>{
        nav("/")
    }



  return (
    <button className="btn btn-primary" onClick={logout}>Logout</button>
  )
}

export default LogoutButton