import "../styles/pages/HistoryPage.css";
import { useOrderData, useOrderDispatch } from "../contexts/orderContext";
import { useEffect } from "react";
import datetimeFormat from "../functions/datetimeFormat";

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
            <div className="order-list">    
                { userOrderHistory?.length === 0 && (
                    <span className="empty-text"> History is empty!</span>
                )}
            
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
                                        <div className="item-content">${item.total}</div>
                                    </div>
                                ))}
                        </div>
                        <div className="order-details-right">
                            <p><b>Total Cost:</b> ${order?.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
