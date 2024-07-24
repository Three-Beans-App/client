import { useState, createContext, useContext } from "react";


const UserDataContext = createContext(null);
const UserDispatchContext = createContext(null);

export function useUserData(){
    return useContext(UserDataContext);
}

export function useUserDispatch(){
    return useContext(UserDispatchContext);
}

export default function UserProvider({children}){

	const [userJwt, setUserJwt] = useState("");
	const [decodedUserJwt, setDecodedUserJwt] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   

    const makeSignupRequest = async (name, email, password, birthday) => {

        let bodyData = { name, email, password, birthday };
		console.log("Body data to send is: ");
		console.log(bodyData);
        try {
            let signUpResult = await fetch("http://localhost:3001/users/signup", {
                method: "POST",
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(error => console.error(error));

            signUpResult = await signUpResult.json();

            console.log ("Sign up result is: " + JSON.stringify(signUpResult));

        setUserJwt(signUpResult.token);
        setDecodedUserJwt(signUpResult.decodedJwt)
        setIsLoggedIn(true);

        return { 
            success: true,
            message: signUpResult.message 
        };            
    } catch (error) {
        console.error("Error signing up: " + error);
    }	
}
    


    const makeLoginRequest = async (email, password) => {
        let bodyData = { email, password };

        try{
            let loginResult = await fetch("http://localhost:3001/users/login", {
                method: "POST", 
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            loginResult = await loginResult.json();

            console.log ("Login result is: " + JSON.stringify(loginResult));

            // Express route for POST /users/jwt returns object with JWT as a property
            setUserJwt(loginResult.token);
            setDecodedUserJwt(loginResult.decodedUserJwt);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    const logoutUser = () => {
        setUserJwt("");
        setDecodedUserJwt({});
        setIsLoggedIn(false);
        console.log("Logout successful!");
    }


    return <UserDataContext.Provider value={{userJwt, decodedUserJwt, isLoggedIn}}>
        <UserDispatchContext.Provider value={{
            // functions to make requests to sign up and log in and so on 
            makeSignupRequest,
            makeLoginRequest,
            logoutUser
        }}>
            {children}
        </UserDispatchContext.Provider>
    </UserDataContext.Provider>
}