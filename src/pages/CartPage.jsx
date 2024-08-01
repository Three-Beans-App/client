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

    const handleDirect = (path) => {
        direct(path);
    }

    const getNumItems = () => {
        const total = cartItems.reduce((total, item) => {
            console.log(item);
            return total + item.count;
        }, 0);
        
        return total
    }

    const getTotalCost = () => {
        const total = cartItems.reduce((total, item) => {
            console.log(item);
            return total + item.item.price * item.count;
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
                <lable className="item-lable">Image </lable>
                <div className="wrapper-name">
                    <lable className="item-lable">Item</lable>
                </div>
                <lable className="item-lable">Qty</lable>
                <lable className="item-lable">Cost</lable>
                <lable className="item-lable">Delete</lable>
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
                                <lable className="item-name">{item.item.name}</lable>
                                <lable className="item-price">$ {item.item.price}</lable>
                            </div>
                        </div>
                        <div className="wrapper">
                            <select className="count" value={item.count} 
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
                            <span className="item-total-price">$ {item.item.price * item.count}</span>
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
