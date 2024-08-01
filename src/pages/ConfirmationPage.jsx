import "../styles/pages/ConfirmationPage.css"
import { useCartData } from "../contexts/cartContext"
import { useNavigate } from "react-router-dom";


export default function ConfirmationPage(){

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
                                <label className="count">{item.count}</label>
                            </div>
                            <div className="wrapper">
                                <span className="item-total-price">$ {item.item.price * item.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-container">
                    <div className="total-item"><b>Total items:</b> {getNumItems()}</div>
                    <div className="total-item"><b>Total cost:</b>  ${getTotalCost()}</div>
                </div>
                <div className="confirm-btn">
                    <div className="back">
                        <button className="back-to-cart" onClick={()=>handleDirect("/cart")}>Go back to cart page</button>
                    </div>
                    <div className="confirm">
                        <button className="confirm-order" onClick={()=>handleDirect("/confirmation")}>Confirm Order</button>
                    </div>
                </div>

            

            </div>
        </div>
    )
}