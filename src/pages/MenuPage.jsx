import "../styles/pages/MenuPage.css"
import MenuSideBar from "../components/MenuSideBar"
import MenuItem from "../components/MenuItem";


export default function MenuPage(){


    return(
        <div id="menuContainer">
            <div id="sideBar">
                <MenuSideBar/>
            </div>
            
            <div id="itemBox">
                <div id="titleAndSearchBox">
                    <div className="title">Coffee</div>
                    <div className="searchBar">
                        <form action="./MenuPage.jsx">
                        <input type="text" placeholder="Search Item" name="search"/>
                        <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
            
                <div className="items">
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                </div>   
            </div>
            
           
        </div>
    )
}