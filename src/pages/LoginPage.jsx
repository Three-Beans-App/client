import { useState } from "react"
import "../styles/pages/LoginPage.css"
import { useUserDispatch } from "../contexts/userContext"
import { NavLink } from "react-router-dom";


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { makeLoginRequest } = useUserDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        makeLoginRequest(email, password)
    }

    return(
      
        <div id="loginContentContainer">
            <div id="loginContentBox">
                <form>
                    <label>Login email: </label>
                    <input 
                    type="text" name="email" id="email" 
                    value={email} onChange={(event) => setEmail(event.target.value)}
                    />
                    <label>Password: </label>
                    <input type="password" name="loginPassword" id="loginPassword"
                    value={password} onChange={(event) => setPassword(event.target.value)} 
        
                    />
                    <div id="space" />
                    <button onClick={handleLogin} id="login-bnt">
                    Login
                    </button>
                    <label>Or if you not a member:</label>
                    <div>
                    <NavLink to={"/signup"}>
                        <button className="button">Sign Up Now</button>
                    </NavLink>
                    </div>
                </form> 
            </div>
        </div>   

    )
}

