import "../styles/components/DropDown.css"
import { useNavigate } from 'react-router-dom';



export default function DropDown(){
    // set avairable of useNavigate
    const direct = useNavigate();

    // set a function to handle the navigation
    const handleDirect = (event) => {
        direct(event.target.value)
    }


    return(
        <div className="drop-down">
            <select onChange={handleDirect} defaultValue={""} className="dropdown-items">
                <option className="options" value="" disabled> Profile </option>
                <option className="options" value="favourite"> My Favourite </option>
                <option className="options" value="cart" > Cart </option>  
            </select>
        </div>
    )
} 