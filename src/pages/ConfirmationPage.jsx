import "../styles/pages/ConfirmationPage.css"
import { useCartData, useCartDispatch } from "../contexts/cartContext"
import { useNavigate } from "react-router-dom";
import { useOrderDispatch } from "../contexts/orderContext";
import { useUserData } from "../contexts/userContext";
import { useState } from "react";
import GuestUser from "../components/GuestUser";


export default function ConfirmationPage(){

    const { cartItems } = useCartData();
    const { handleEmptyCart } = useCartDispatch();
    const { userCreateOrder } = useOrderDispatch();
    const { userId, isLoggedIn } = useUserData();

    const [guestName, setGuestName] = useState("");
    const [guestContact, setGuestContact] = useState("");
    const [guestError, setGuestError] = useState(false);

    const direct = useNavigate();

    // set the guest name when there is no login user to check out
    const onNameChange = (value) => {
        setGuestName(value);
    }

    // set the guest conact number when there is no login user to check out
    const onContactChange = (value) => {
        setGuestContact(value);
    }

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

    // to check the whether the guest user type their details
    const invalidGuestUser = () => {
            return guestName.trim() === '' || guestContact.trim() === '';
    }

    // create order and clear the cart 
    const confirmAndCreateOrder = ()=>{
        if (userId) {
            userCreateOrder({guestUser: null, userId });  
        } else {
            if (invalidGuestUser()) {
                setGuestError(true);
                return;
            }
            userCreateOrder({ guestUser: { name: guestName, contact: guestContact }, userId: null });
        }
        setGuestError(false);
        handleEmptyCart();
        handleDirect("/order");
    }

    return(
        <div id="confirmation-container">
            <div id="confirmation-sub-container">
                <section id="title-container">
                    <label>Order Confirmation</label>
                </section>
                <div className="header-content">
                    <label className="item-label">Image </label>
                    <div className="wrapper-name">
                        <label className="item-label">Item</label>
                    </div>
                    <label className="item-label">Qty</label>
                    <label className="item-label">Cost</label>
                </div>
                <div id="items-container">
                    {cartItems.map((item) => (
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
                                <label className="count">{item.quantity}</label>
                            </div>
                            <div className="wrapper">
                                <span className="item-total-price">$ {item.item.price * item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-container">
                    <div className="total-item"><b>Total items:</b> {getNumItems()}</div>
                    <div className="total-item"><b>Total cost:</b>  ${getTotalCost()}</div>
                </div>

                {!userId && !isLoggedIn && 
                    <div>
                        <GuestUser 
                            name={guestName}
                            contact={guestContact}
                            onNameChange={onNameChange}
                            onContactChange={onContactChange}
                        />
                        {guestError && <div className="invalid-details">Enter a valid name and contact</div>}
                    </div>
                }
                <div className="confirm-btn">
                    <div className="back">
                        <button className="back-to-cart" onClick={()=>handleDirect("/cart")}>Back to cart</button>
                    </div>
                    <div className="confirm">
                        <button className="confirm-order" onClick={confirmAndCreateOrder}>Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}