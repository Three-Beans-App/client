import React from "react";
import { useUserData } from "../contexts/userContext";
import "../styles/components/Footer.css"
import { useNavigate } from 'react-router-dom';


export default function Footer(){

    const { isAdmin } = useUserData();

    const navigate = useNavigate();

    // function for navigate router
    const handleNavigate = (path) => {
        navigate(path)
    }
 

    return(
        <footer>
            <div className="footer-div">
                <h3 className="copyright">Copyright 2024 Three Beans Cafe</h3>
            </div>
            
            { isAdmin && 
                <div className="footer-btn">
                    <button className="admin-btn" onClick={()=> handleNavigate("/admin")}>Admin</button>
                </div>
            }
        </footer>
    )
}