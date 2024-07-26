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
            
                {/* <div> 
                    <label>Choose a milk type:</label>
                    <select id="milkType">
                        <option value="full">Full Cream</option>
                        <option value="skim">Skim Milk</option>
                        <option value="almond">Almond</option>
                        <option value="oat">Oat</option>
                        <option value="soy">Soy</option>
                    </select>  
                </div> */}
                {/* <div id="option-container">
                    <div id="sweetnerBox">
                        <label>Sweetners:</label>
                        <div id="sweetner-items">
                            <label className="sweetner-options">
                                <span>1/2 Sugar</span> 
                                <input type="checkbox" value="1/2 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span> 1 Sugar </span> 
                                <input type="checkbox" value="1 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>2 Sugar </span>
                                <input type="checkbox" value="2 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>3 Sugar </span>
                                <input type="checkbox" value="3 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>4 Sugar </span>
                                <input type="checkbox" value="4 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>1 Equal </span>
                                <input type="checkbox" value="1 equal"/>
                            </label>
                            <label className="sweetner-option">
                                <span>2 Equal </span>
                                <input type="checkbox" value="2 equal "/>
                            </label>
                            <label className="sweetner-option">
                                <span>3 Equal </span>
                                <input type="checkbox" value="3 equal "/>
                            </label>
                        </div>
                    </div>
                    <div id="syrupBox">
                        <label>Syrups:</label>
                        <div id="syrup-items">
                            <label className="syrup-options">
                                <span>Caramel</span> 
                                <input type="checkbox" value="caramel"/>
                            </label>
                            <label className="syrup-options">
                                <span>Vanilla</span> 
                                <input type="checkbox" value="vanilla"/>
                            </label>
                            <label className="syrup-options">
                                <span>Hazelnut</span> 
                                <input type="checkbox" value="hazelnut"/>
                            </label>
                        </div> */}
                    {/* </div> */}
                {/* </div> */}
            </div>
            <div>
                <Star  onClick={(e) => { e.stopPropagation(); onStarClick(item); }}/>
            </div>
            <div>
                <AddShoppingCartIcon  onClick={(e) => { e.stopPropagation(); onAddToCart(item); }} />
            </div>

        </div>
    )
}
