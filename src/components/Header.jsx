import "../styles/components/Header.css";
import React from "react";
import NavBar from "./Navbar";


export default function Header(){

    return (
        <header>
            <div id="logo">
                <img src="/logo.png" alt="logoImage"/>
            </div>
        
            <nav id="navBox">
                
                <NavBar className="navLink"/>
            </nav>
           
        </header>
    )
}