import "../styles/components/MenuSideBar.css"
// Display Menu catagory
// Coffee
// Tea
// Milkshaks
// Food

export default function MenuSideBar(){

    return(
        <>  
            <div id="menuSideBarContainer">
                <button>Menu</button>
                <button className="catagory">Coffee</button>
                <button className="catagory">Tea</button>
                <button className="catagory">Milkshakes</button>
                <button className="catagory">Food</button>
            </div>
        </>

    )
}