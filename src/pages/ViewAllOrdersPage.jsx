import { useOrderData, useOrderDispatch } from "../contexts/orderContext"
import "../styles/pages/ViewAllOrderPage.css"
import datetimeFormat from "../functions/datetimeFormat";
import { useEffect } from "react";


export default function ViewAllOrdersPage(){
    const { allOrders } = useOrderData();
    const { adminViewAllOrders } = useOrderDispatch()

    useEffect(() => {
        adminViewAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="order-history">
            <div className="historytitle">
                <h2>All Orders</h2>
            </div>
            <div className="order-list">    
                { allOrders?.length === 0 && (
                    <span className="empty-text"> No Orders!</span>
                )}
            
                {allOrders.map((order) => (
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
    )
}