import "../styles/pages/CartPage.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Cart from "../components/Cart"
import { useState } from "react";


export default function CartPage(){

    const [cartItems, setCartItems] = useState([])
    
    const addItemToCart = (item) => {
        const newItem = {
            ...item,
            count: 1,
        }
        setCartItems([...cartItems, newItem])
    }   

    return(
        <div id="cart-container">

        <Cart 
            items={cartItems}
        />
            {/* <div id="cart-top-box">
                <div id="cart-title">
                    <label>Cart</label>
                </div>
                <div> 
                    total items
                </div>
                <div>
                    total amount: 
                </div>
            </div>
            <div id="cart-content-box">
                
            </div>
             <h1>This is cart page!!!</h1>
            <label>This is cart icon</label>
            <div id="icon">
                <AddShoppingCartIcon  />
                <RemoveCircleOutlineIcon />
                <AddCircleOutlineIcon />
            </div> */}
            

        </div>
    )
}