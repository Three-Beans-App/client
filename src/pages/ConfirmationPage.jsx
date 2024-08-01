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
                    <lable className="item-lable">Image </lable>
                    <div className="wrapper-name">
                        <lable className="item-lable">Item</lable>
                    </div>
                    <lable className="item-lable">Qty</lable>
                    <lable className="item-lable">Cost</lable>
                </div>
                <div id="items-container">
                    {cartItems.map((item) => (
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
                                <lable className="count">{item.count}</lable>
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