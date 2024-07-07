import "../styles/Header.css";
import { NavLink } from "react-router-dom"

export default function Header(){

    return (
        <header>
            <div id="logo">
                <img src="logo.jpeg" alt="logoImage"/>
            </div>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/menu"}>Menu</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/cart"}>Cart</NavLink>
            </nav>
        </header>
    )
}