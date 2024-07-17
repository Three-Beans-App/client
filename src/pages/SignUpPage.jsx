import "../styles/pages/SignUpPage.css"
import { useState } from 'react'
import { useUserDispatch } from "../contexts/userContext"

export default function SignUpPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")

    const {makeSignupRequest} = useUserDispatch();

    const handleSignup = (event) => {
        event.preventDefault();
        makeSignupRequest(email, password);
    }

    return(
        <div id="signupContentContainer">
            <div id="signupContentBox">
                <form>
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
                    <button onClick={handleSignup} >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
