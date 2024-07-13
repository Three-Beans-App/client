import "../styles/components/Header.css";
import { NavLink } from "react-router-dom"

export default function Header(){

    return (
        <header>
            <div id="logo">
                <img src="logo.jpeg" alt="logoImage"/>
            </div>
        
            <nav>
                <NavLink to="/" className="navLink">Home</NavLink>
                <NavLink to="/menu" className="navLink">Menu</NavLink>
                <NavLink to="/login" className="navLink">Login/Sign Up</NavLink>
            </nav>
           
        </header>
    )
}