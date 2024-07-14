import "../styles/components/MenuItem.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// Show the item picture
// Show the item name
// Show the price
// Show the description
// Show the favourite bar
// Show the cart

export default function MenuItem(){


    return (
        <div id="menuItemContainer">
    
            <div id="itemImage">
                <img src="coffee.png" alt="Description" />
            </div>
            <div id="itemDetail">
                <div id="description">
                    <h3>cappacinno</h3>
                    <h4>$ 6</h4>
                    <h5>description</h5>
                </div>
                <div id="icon">
                    <div className="star">
                        <StarBorderIcon/>  
                        {/* <StarRateIcon />  */}
                    </div>
                    <div className="addToCart">
                        <AddShoppingCartIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
