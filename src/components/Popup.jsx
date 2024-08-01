import "../styles/components/Popup.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Star from "./Star";
import useOnClickOutsideClose from "../functions/OnClickOutsideClose";
import { useRef } from "react";



export default function Popup({item, handleCloseItemDetail, onAddToCart, onStarClick}){

    const popupItemRef = useRef(null);

    useOnClickOutsideClose(popupItemRef, handleCloseItemDetail);
    

    return(

        <div id="ItemBigBox" data-closable ref={popupItemRef}>
            
            <div id="imageCloseContainer">
                <img src={item.image} alt="Description" className="image"/>
                <IconButton aria-label="close" className="IconButton" onClick={handleCloseItemDetail }>
                    <CloseIcon />
                </IconButton>
            </div>
            <div id="detail-container">
                <div id="detailBox">
                    <h3>{item.name}</h3>
                    <label>{item.price}</label>
                    <p>{item.description}</p>
                </div>
                <div id="icon">
                    <div>
                        <Star className="start-icon" onClick={(e) => { e.stopPropagation(); onStarClick(item); }}/>
                    </div>
                    <div>
                        <AddShoppingCartIcon className="cart-icon" onClick={(e) => { e.stopPropagation(); onAddToCart(item); }} />
                    </div>
                </div>
            </div>
            

        </div>
    )
}
