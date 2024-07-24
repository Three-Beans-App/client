import "../styles/components/MenuItem.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Star from "./Star";


export default function MenuItem({ name, price, description, image }){


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
                <div className="star" >
                      <Star/>
                </div>
                    <div className="addToCart">
                        <AddShoppingCartIcon />
                    </div>
                </div>
            </div>
            
        </div>
    )
}
