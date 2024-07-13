import "../styles/pages/HomePage.css";
import { NavLink } from "react-router-dom";


export default function HomePage() {


    return(
        <div id="homeContainer">
            <div id="homeTitle">
                <h1> Welcome to Three Beans Cafe</h1>
            </div>
            <div>
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
            <NavLink to={"/menu"}>
                <button className="button">Order Now</button>
            </NavLink>
    
        </div>
    )
}