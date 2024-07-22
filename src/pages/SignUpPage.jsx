import "../styles/pages/SignUpPage.css"
import { useState } from 'react'
import { useUserDispatch } from "../contexts/userContext"
import { NavLink } from "react-router-dom";


export default function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const {makeSignupRequest} = useUserDispatch();

    const handleSignup = async (event) => {
        event.preventDefault();
        const result = await makeSignupRequest(name, email, password, birthday);
        if (result.success) {
            setMessage(result.message);
            setIsSubmitted(true);
        } else {
            setMessage(result.message);
        }
    };
    

    return(
        <div id="signupContentContainer">
            <div id="signupContentBox">
                {isSubmitted ? (
                    <div className="confirmation">
                    <h2>{message}</h2>
                    <NavLink to="/">Go to Home Page</NavLink>
                    </div>
                ) : (
                    <form onSubmit={handleSignup}>
                    <label>Your Name:</label>
                    <input 
                        type="text" name="name" id="name"
                        value={name} onChange={(event)=> setName(event.target.value)}
                        />
                    <label>Your Birthday:</label>
                    <input 
                        type="date" name="birthday" id="birthday"
                        value={birthday} onChange={(event)=> setBirthday(event.target.value)}
                        />
                    <label>Sign Up email: </label>
                    <input 
                        type="text" name="email" id="email"
                        value={email} onChange={(event)=> setEmail(event.target.value)}
                        />
                    <label>Sign Up Password: </label>
                    <input 
                        type="password" name="pssword" id="password"
                        value={password} onChange={(event)=>setPassword(event.target.value)}
                    />
                    <div id="spacer" />
                    <button type="submit" >
                        Sign Up
                    </button>
                </form>


            )}      
            </div>
        </div>
    )
}