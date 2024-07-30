import { useState, createContext, useContext } from "react";
import axios from 'axios';

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
            let response = await axios.post("http://localhost:3001/users/signup", bodyData)
            
            let signUpResult = response.data

            setUserJwt(signUpResult.token);
            setDecodedUserJwt(signUpResult.decodedJwt)
            setIsLoggedIn(true);

            console.log ("Sign up result is: " + JSON.stringify(signUpResult));

            return { 
                success: true,
                message: signUpResult.message 
            };  
        } catch(error){
            console.error(error.message);
            return {
                success: false,
                message: error.response ? error.response.data.message : error.message
            };
        } 	
}
    

    const makeLoginRequest = async (email, password) => {
        let bodyData = { email, password };

        try{
            const response = await axios.post("http://localhost:3001/users/login", bodyData);

            const loginResult = response.data;

            console.log ("Login result is: " + JSON.stringify(loginResult));

            if(response.status !== 200) {
                return {
                    success: false,
                    message: "Invalid login attempt",
                };
            }

            setUserJwt(loginResult.token);
            setDecodedUserJwt(loginResult.decodedUserJwt);
            setIsLoggedIn(true);

            return response;
        }  catch(error){
            return {
                success: false,
                message: error.response ? error.response.data.message : error.message
            };
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