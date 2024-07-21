import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../styles/components/UserDropdown.css";


export default function UserDropdown(){

    // check whether is open
    const [ isOpen, setIsOpen ] = useState(false)

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


    // set a function when onclick outside of the dropdown will close the dropdown menu
    const handleOnClickOutside = (event) => {
        if (dropdownmenuRef.current && !dropdownmenuRef.current.contains(event.target)){
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOnClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleOnClickOutside);
          };
        }, []);


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
                    <button onClick={()=>handleDirect("/")}>Logout</button>
                </div>
            )}
          
        </div>
    )
} 
