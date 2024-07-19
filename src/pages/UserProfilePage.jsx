import DropDown from "../components/DropDown";
import "../styles/pages/UserProfilePage.css";
import MenuPage from "./MenuPage";



export default function UserProfilePage(){

    return(
        <div id="profile-container">
            <div id="dropdown-container">
                <DropDown />
            </div> 
            <div id="menu-container">
                <MenuPage/>
            </div>           
        </div>
    )

}

