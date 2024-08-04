import "../styles/pages/CartPage.css"
import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartDispatch, useCartData } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";




export default function CartPage(){
    const { handleQuantityChange, handleRemoveItem } = useCartDispatch();
    const { cartItems } = useCartData();


    const direct = useNavigate();

    // navigateion route
    const handleDirect = (path) => {
        direct(path);
    }

    // caculate the total number of the items
    const getNumItems = () => {
        const total = cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        return total
    }

    // caculate the total of cost
    const getTotalCost = () => {
        const total = cartItems.reduce((total, item) => {
            return total + item.item.price * item.quantity;
        }, 0);
        
        return total.toFixed(2);
    }

  return (
    <div id="cart-main-container">
        <div id="cart-sub-container">
            <div className="cart-header"> 
                <h2>Cart</h2>
            </div>
            <div className="header-content">
                <label className="item-label">Image </label>
                <div className="wrapper-name">
                    <label className="item-label">Item</label>
                </div>
                <label className="item-label">Qty</label>
                <label className="item-label">Cost</label>
                <label className="item-label">Delete</label>
            </div>
            <div id="items-container">
                { cartItems.length === 0 && (
                    <span className="empty-text"> Cart is empty!</span>
                )}
                {   cartItems.map((item) => (
                    <div className="cart-items" key={item.item.name}>
                        <div className="wrapper">
                            <img className="image"src={item.item.image} alt={item.item.name} />
                        </div>
                        <div className="wrapper-name">
                            <div className="item-detail">
                                <label className="item-name">{item.item.name}</label>
                                <label className="item-price">$ {item.item.price}</label>
                            </div>
                        </div>
                        <div className="wrapper">
                            <select className="count" value={item.quantity} 
                                onChange={(event) => {
                                    handleQuantityChange(
                                        item.item.name,
                                        Number(event.target.value)
                                    );
                                }}
                            >
                                {[
                                    ...Array(10)
                                ].map((_, index) => {
                                    const num = index + 1;
                                    return(
                                        <option value={num} key={num}>
                                            {num}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="wrapper">
                            <span className="item-total-price">$ {(item.item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="wrapper">
                            <IconButton aria-label="close" className="remove-button" onClick={()=>handleRemoveItem(item.item.name)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}

                <div className="total-container">
                    <div className="total-item"><b>Total items:</b> {getNumItems()}</div>
                    <div className="total-item"><b>Total cost:</b>  ${getTotalCost()}</div>
                </div>
                
                {cartItems.length > 0 && (
                    <button className="checkout-bnt" onClick={()=>handleDirect("/confirmation")}> Go to check out</button>
                )}
            </div>
        </div>
    </div>
  )
}
