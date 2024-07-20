import { useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles/components/NavBar.css";
import UserDropdown from "./UserDropdown";

export default function NavBar(){

    // create state to store the user login 
    const [ isUserLogin, setIsUserLogin ] = useState(true)
    // create state to store the user
    // const [ user, setUser ] = useState(null)
    

    // const handleUserLogin = ()=> {
    //     setIsUserLogin(true);
    //     setUser({username:"Jay" })
    // }

    // const handleLogout =() => {
    //     setIsUserLogin(false);
    //     setUser(null)
    // }


     // set avairable of useNavigate
    //  const direct = useNavigate();

     // set a function to handle the navigation
    //  const handleDirect = (event) => {
    //      direct(event.target.value)
    //  }

    return(
        <nav>
            <NavLink to="/" className="navLink">Home</NavLink>
            <NavLink to="/menu" className="navLink">Menu</NavLink>
            {isUserLogin ? (
                <UserDropdown />
            ) : (
                <>
                    <NavLink to="/login" className="navLink">Login/Sign Up</NavLink>
                </>
            )}
            
        </nav>
)



}