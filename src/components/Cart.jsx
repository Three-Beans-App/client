import React from 'react'
import "../styles/components/Cart.css"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ items, quantityChange, removeItem}) {

  return (
    <div id="cart-main-container">
        <div id="cart-sub-container">
            <div className="cart-header"> 
                <h2>Cart:</h2>
            </div>
            <div id="items-container">
                {items.length === 0 && (
                    <span className="empty-text"> Cart is empty!</span>
                )}
                {items.map((item) => (
                    <div className="cart-items" key={item.item.name}>
                        <img className="image"src={item.item.image} alt={item.item.name} />
                        <div className="item-detail">
                            <h3>{item.item.name}</h3>
                            <span className="item-price">{item.item.price * item.count}$</span>
                        </div>
                        <select className="count" value={item.count} 
                            onChange={(event) => {
                                quantityChange(
                                    item.item.name,
                                    event.target.value
                                );
                            }}>
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
                        <IconButton aria-label="close" className="remove-button" onClick={()=>removeItem(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
                {items.length > 0 && (
                    <button className="checkout-bnt" > Go to check out</button>
                )}
            </div>
    
    
        </div>
    </div>
  )
}

export default Cart

