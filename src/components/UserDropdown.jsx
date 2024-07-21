import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../styles/components/UserDropdown.css";


export default function UserDropdown(){

    // check whether is open
    const [ isOpen, SetIsOpen ] = useState(false)

    // set avairable of useNavigate
    const direct = useNavigate();

    // set toggle to the icon, when toggle when set to true
    const handleToggle = () => {
        SetIsOpen(!isOpen);
    };

    // set a function to handle the navigation
    const handleDirect = (path) => {
        direct(path);
        SetIsOpen(false)
    }


    return(
        <div className="drop-down">
            <div className="dropdown-icon" onClick={handleToggle}>
                <AccountCircleIcon className="icon" />
            </div>
            {isOpen && (
                <div className="dropdown-items" > 
                    <button onCLick={()=>handleDirect("/login")}>Login</button>
                    <button onClick={()=>handleDirect("/signup")}>Signup</button>
                    <button onClick={()=>handleDirect("/profile")}>Profile</button>
                    <button onClick={()=>handleDirect("/profile/favourite")}>Favourite</button>
                    <button onClick={()=>handleDirect("/profile/cart")}>Cart</button>
                    <button onClick={()=>handleDirect("/profile/history")}>History</button>
                </div>
            )}
          
        </div>
    )
} 
