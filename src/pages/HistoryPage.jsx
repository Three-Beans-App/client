import "../styles/pages/HistoryPage.css";
import { useOrderData, useOrderDispatch } from "../contexts/orderContext";
import { useEffect } from "react";
import  datetimeFormat from "../functions/datetimeFormat";
import { toDollarValue } from "../functions/toDollarValue";

export default function HistoryPage() {
    const { userOrderHistory } = useOrderData();
    const { userViewAllOrders } = useOrderDispatch();

    // call the function for user view all the history 
    useEffect(() => {
        userViewAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="order-history">
            <div className="historytitle">
                <h2>Order History</h2>
            </div>
            { userOrderHistory?.length === 0 && (
                    <span className="empty-text"> History is empty!</span>
                )}
            
            <div className="order-list">    
                
                {userOrderHistory.map((order) => (
                    <div className="order-container" key={order?.itemId}>
                        <div className="order-details-left">
                            <p><b>Date:</b> {datetimeFormat(order?.date)}</p>
                            <p><b>Status:</b> {order?.status}</p>
                        </div>
                        <div className="order-items">
                             <h3>Ordered Items</h3>
                                <div className="items-header">
                                    <div className="item-name-content">Name</div>
                                    <div className="item-content">Quantity</div>
                                    <div className="item-content">Price</div>
                                    <div className="item-content">Cost</div>
                                </div>
                                {order?.items.map((item) => (
                                    <div className="item-details">
                                        <div className="item-name-content">{item.name}</div>
                                        <div className="item-content">{item.quantity}</div>
                                        <div className="item-content">${item.price}</div>
                                        <div className="item-content">${toDollarValue(item.total)}</div>
                                    </div>
                                ))}
                        </div>
                        <div className="order-details-right">
                            <p><b>Total Cost:</b> ${order?.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
