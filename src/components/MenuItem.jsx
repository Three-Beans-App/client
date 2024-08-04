import "../styles/components/MenuItem.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Star from "./Star";
import { useUserData } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";


export default function MenuItem({ id, name, price, description, image, onStarClick, onAddToCart, onOpenItemDetail }){
    
    const {isLoggedIn} = useUserData();
    const { isAdmin } = useUserData()

    const navigate = useNavigate();

    // function for navigater router
    const handleNavigate = (path) => {
        navigate(path)
    }

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
                        {isLoggedIn && !isAdmin ? 
                            <div className="star" onClick={(e) => { e.stopPropagation(); onStarClick();}}>
                                <Star itemId={id}/>
                            </div>
                            :
                            !isAdmin && <div />
                        }
                        <div className="update-button">
                        { isAdmin &&
                            <div className="admin-update-item" onClick={()=> handleNavigate(`/update-item/${id}`)}>
                                <BorderColorIcon/>
                            </div>
                        }
                        </div>
                        
                        <div className="addToCart" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
                            <AddShoppingCartIcon />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
