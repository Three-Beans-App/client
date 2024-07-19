import "../styles/components/Header.css";
import { NavLink } from "react-router-dom"
import NavBar from "./Navbar";


export default function Header(){

    return (
        <header>
            <div id="logo">
                <img src="logo.png" alt="logoImage"/>
            </div>
        
            <nav>
                <NavBar className="navLink"/>
            </nav>
           
        </header>
    )
}