import "../styles/HomePage.css";
import { NavLink } from "react-router-dom";


export default function HomePage() {


    return(
        <div id="homeContainer">
            <h1 id="homeTitle"> Welcome to Three Beans Cafe</h1>
            <NavLink to={"/menu"}>
                <button className="button">Order Online</button>
            </NavLink>
            
        </div>
    )
}