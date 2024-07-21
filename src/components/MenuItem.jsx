import "../styles/components/MenuItem.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useState } from "react";
// Show the item picture
// Show the item name
// Show the price
// Show the description
// Show the favourite bar
// Show the cart

export default function MenuItem({ name, price, description, image }){

    const [ isClick, setIsClick ] = useState(false)

    const handleStarOnClick = () => {
        setIsClick(!isClick);
    }

    return (
        <div id="menuItemContainer">
    
            <div id="itemImage">
                <img src={image} alt="Description" />
            </div>
            <div id="itemDetail">
                <div id="details">
                    <h3 id="title">{name}</h3>
                    <h4 id="price">${price}</h4>
                    <h5 id="description">{description}</h5>
                </div>
                <div id="icon">
                <div className="star" onClick={handleStarOnClick}>
                        {isClick ? <StarOutlinedIcon /> :  <StarBorderIcon/>}
                </div>
                    <div className="addToCart">
                        <AddShoppingCartIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
