
import { NavLink } from "react-router-dom"
import "../styles/components/Navbar.css";
import UserDropdown from "./UserDropdown";
import { useUserData } from "../contexts/userContext";

export default function NavBar(){

  
    const {isLoggedIn} = useUserData();
 
    


    return(
        <nav>
            <NavLink to="/" className="navLink">Home</NavLink>
            <NavLink to="/menu" className="navLink">Menu</NavLink>
            {isLoggedIn ? (
                <UserDropdown />
            ) : (
                <>
                    <NavLink to="/login" className="navLink">Login</NavLink>
                </>
            )}
            
        </nav>
)



}