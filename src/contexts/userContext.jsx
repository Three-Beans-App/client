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
    const [ isAdmin, setIsAdmin ] = useState(localStorage.getItem('isAdmin') === 'true')

    // update userJwt and store value to localStorage
    const storeUserJwt = (value) => {
        setUserJwt(value);
        localStorage.setItem('userJwt', value);
    }

     // update decodedUserJwt and store value to localStorage
    const storeDecodedUserJwt = (value) => {
        setDecodedUserJwt(value);
        localStorage.setItem('decodedUserJwt', JSON.stringify(value || {}));
    }

     // update isLoggedIn value and store value to localStorage
    const storeIsLoggedIn = (value) => {
        setIsLoggedIn(value);
        localStorage.setItem('isLoggedIn', value);
    }

     // update userId and store value to localStorage
    const storeUserId = (value) => {
        setUserId(value);
        localStorage.setItem('userId', value);
    }

     // update isAdmin value and store value to localStorage
    const storeIsAdmin = (value) => {
        setIsAdmin(value);
        localStorage.setItem('isAdmin', value);
    }

    // for user to sign up and store all the information
    const makeSignupRequest = async (name, email, password, birthday) => {

        let bodyData = { name, email, password, birthday };
        try {
            let response = await axios.post("http://localhost:3001/users/signup", bodyData)
            
            let signUpResult = response.data

            storeUserJwt(signUpResult.token);
            storeDecodedUserJwt(signUpResult.decodedJwt);
            storeIsLoggedIn(true);
            storeUserId(signUpResult.newUser._id)
            storeIsAdmin(signUpResult.newUser.admin)

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
    
    // user login request and store all the information 
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
            storeIsAdmin(loginResult.admin)

            return response;
        }  catch(error){
            return {
                success: false,
                message: error.response ? error.response.data.message : error.message
            };
        } 
    }

    // user log out, then clear all the information
    const logoutUser = () => {
        storeUserJwt("");
        storeDecodedUserJwt({});
        storeIsLoggedIn(false);
        storeUserId(null);
        storeIsAdmin(null)
    }


     // update an existing user 
     const updateExistingUser = async ( name, email, password, birthday) => {

        try {
            const updateUserUrl =`http://localhost:3001/users/update/`
            await axios.patch(updateUserUrl, {
                name,
                email,
                password,
                birthday
            },
            {headers: {
                'Authorization': `Bearer ${userJwt}`
            }});
        } catch (error) {
            console.error("Error adding menu item: ", error);
        }
    }



    return <UserDataContext.Provider value={{userJwt, decodedUserJwt, isLoggedIn, userId, isAdmin}}>
        <UserDispatchContext.Provider value={{
            makeSignupRequest,
            makeLoginRequest,
            logoutUser,
            updateExistingUser
        }}>
            {children}
        </UserDispatchContext.Provider>
    </UserDataContext.Provider>
}