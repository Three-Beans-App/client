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

    const [userJwt, setUserJwt] = useState(localStorage.getItem('userJwt') || "");
    const [decodedUserJwt, setDecodedUserJwt] = useState(JSON.parse(localStorage.getItem('decodedUserJwt') || '{}'));
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    const storeUserJwt = (value) => {
        setUserJwt(value);
        localStorage.setItem('userJwt', value);
    }
    const storeDecodedUserJwt = (value) => {
        setDecodedUserJwt(value);
        localStorage.setItem('decodedUserJwt', JSON.stringify(value || {}));
    }
    const storeIsLoggedIn = (value) => {
        setIsLoggedIn(value);
        localStorage.setItem('isLoggedIn', value);
    }
    const storeUserId = (value) => {
        setUserId(value);
        localStorage.setItem('userId', value);
    }

    const makeSignupRequest = async (name, email, password, birthday) => {

        let bodyData = { name, email, password, birthday };
        try {
            let response = await axios.post("http://localhost:3001/users/signup", bodyData)
            
            let signUpResult = response.data

            storeUserJwt(signUpResult.token);
            storeDecodedUserJwt(signUpResult.decodedJwt);
            storeIsLoggedIn(true);
            storeUserId(signUpResult.newUser._id)
            
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

            if(response.status !== 200) {
                return {
                    success: false,
                    message: "Invalid login attempt",
                };
            }

            storeUserJwt(loginResult.token);
            storeDecodedUserJwt(loginResult.decodedUserJwt);
            storeIsLoggedIn(true);
            storeUserId(loginResult.userId)

            return response;
        }  catch(error){
            return {
                success: false,
                message: error.response ? error.response.data.message : error.message
            };
        } 
    }

    const logoutUser = () => {
        storeUserJwt("");
        storeDecodedUserJwt({});
        storeIsLoggedIn(false);
        storeUserId(null);
    }


    return <UserDataContext.Provider value={{userJwt, decodedUserJwt, isLoggedIn, userId}}>
        <UserDispatchContext.Provider value={{
            makeSignupRequest,
            makeLoginRequest,
            logoutUser,
        }}>
            {children}
        </UserDispatchContext.Provider>
    </UserDataContext.Provider>
}