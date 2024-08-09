import "../styles/pages/HomePage.css";
import React from "react";
import {  useNavigate } from "react-router-dom";


export default function HomePage() {
    const direct = useNavigate();

    const handleNavigate = (path) => {
        direct(path)
    }
    return(
        <div id="homeContainer">
            <div id="homeTitle">
                <h1> Welcome to Three Beans Cafe</h1>
            </div>
            <div className="homeContents">
                <h2> Opening Hours</h2>
                <h3>
                    Monday -Friday: 5am - 4pm
                </h3>
                <h3>
                    Saturday - Sunday: 6am - 2pm
                </h3>
                <h3>
                    Public Holiday: 6am -2pm
                </h3>
            </div>
            <button className="nav-button" onClick={()=>handleNavigate("/menu")}>Order Now</button>
        </div>
    )
}