import { useState,  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../styles/components/UserDropdown.css";
import useOnClickOutsideClose from "../functions/OnClickOutsideClose";
import {  useUserDispatch } from "../contexts/userContext";

export default function UserDropdown(){

    // check whether is open
    const [ isOpen, setIsOpen ] = useState(false);

    // log out user
    const {logoutUser} = useUserDispatch();



    // set avairable of useNavigate
    const direct = useNavigate();

    // set avairabel of useRef
    const dropdownmenuRef = useRef(null);

    // set toggle to the icon, when toggle when set to true
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // set a function to handle the navigation
    const handleDirect = (path) => {
        direct(path);
        setIsOpen(false)
    }


    // when on click outside of the contents close the dropdown menu
    useOnClickOutsideClose(dropdownmenuRef, ()=>setIsOpen(false));


    // handle logout 
    const handleLogout = () => {
        logoutUser();
        handleDirect("/")
    };

    return(
        <div className="drop-down"  ref={dropdownmenuRef}>
            <div className="dropdown-icon" onClick={handleToggle}>
                <AccountCircleIcon className="icon" />
            </div>
            {isOpen && (
                <div className="dropdown-items" > 
                    <button onClick={()=>handleDirect("/favourite")}>Favourite</button>
                    <button onClick={()=>handleDirect("/cart")}>Cart</button>
                    <button onClick={()=>handleDirect("/history")}>History</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
          
        </div>
    )
} 
