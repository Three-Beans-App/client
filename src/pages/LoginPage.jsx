import { useState } from "react"
import "../styles/pages/LoginPage.css"
import { useUserDispatch } from "../contexts/userContext"
import { useNavigate } from "react-router-dom";


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { makeLoginRequest } = useUserDispatch();
    const direct = useNavigate();


    // call the login request function
    // then navigate to home page after login
    const handleLogin = async (event) => {
        event.preventDefault();
        const loginRes = await makeLoginRequest(email, password);

        if (loginRes.success === false){
            setError(loginRes.message);
        } else {
            setError("");
            handleNavigate("/");
        };
    }

    const handleNavigate = (path) => {
        direct(path)
    }


    return(
      
        <div id="loginContentContainer">
            <div id="loginContentBox">
                <form onSubmit={handleLogin}>
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
                    <button  type="submit" >
                    Login
                    </button>
                    <label>Or if you not a member:</label>
                    <div>
                        <button  className="bnt" onClick={()=>handleNavigate("/signup")}>Sign Up Now</button>
                    </div>
                    {error && 
                        <div className="error">{error}</div>
                    }
                </form> 
            </div>
        </div>   

    )
}

