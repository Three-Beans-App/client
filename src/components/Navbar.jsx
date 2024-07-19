import { useState } from "react"
import { NavLink } from "react-router-dom"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import "../styles/components/Navbar.css";

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

    return(
        <nav>
            <NavLink to="/" className="navLink">Home</NavLink>
            <NavLink to="/menu" className="navLink">Menu</NavLink>
            {isUserLogin ? (
                <NavLink to="/profile" className="navLink">
                    <AccountBoxIcon className="icon"/>
                </NavLink>
            ) : (
                <>
                    <NavLink to="/login" className="navLink">Login/Sign Up</NavLink>
                </>
            )}
            
        </nav>

    )



}