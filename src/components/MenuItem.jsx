import "../styles/components/MenuItem.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Star from "./Star";
import { useUserData } from "../contexts/userContext";


export default function MenuItem({ name, price, description, image, onStarClick, onAddToCart, onOpenItemDetail }){
    
    const {isLoggedIn} = useUserData();

    return (
        <div id="menuItem-main-container">
           
            <div id="menuItemContainer" onClick={onOpenItemDetail}>
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
                        {isLoggedIn ? 
                            <div className="star" onClick={(e) => { e.stopPropagation(); onStarClick();}}>
                                <Star/>
                            </div>
                            :
                            <div />
                        }
                        <div className="addToCart" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
                            <AddShoppingCartIcon />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
