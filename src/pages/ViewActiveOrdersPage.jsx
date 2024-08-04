import { useEffect } from "react";
import { useOrderData, useOrderDispatch } from "../contexts/orderContext"
import "../styles/pages/ViewActiveOrdersPage.css"
import datetimeFormat from "../functions/datetimeFormat";
import { useUserData } from "../contexts/userContext";


export default function ViewActiveOrdersPage(){
    const { adminViewActiveOrders, updateOrderStatus, deleteOrder} = useOrderDispatch()
    const { activeOrders } = useOrderData()
    const { isAdmin } = useUserData()

    // load the function for admin to view all the active orders 
    useEffect(() => {
        adminViewActiveOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // for change the next status
    const getNextStatus = (status) => {
        if (status === "pending") {
            return "preparing";
        }
        if (status === "preparing") {
            return "ready";
        }
        if (status === "ready") {
            return "completed";
        }
    }

    // for the after the status first changed
    // then set to the next status
    const getAction = (status) => {
        if (status === "pending") {
            return "Start preparing";
        }
        if (status === "preparing") {
            return "Ready for pickup";
        }
        if (status === "ready") {
            return "Complete order";
        }
    }

    // check whether is admin, if not admin return null
    if (!isAdmin) {
        return null;
    }
    
    return(
        <div className="order-history">
            <div className="historytitle">
                <h2>All Active Orders</h2>
            </div>
            <div className="order-list">    
                { activeOrders?.length === 0 && (
                    <span className="empty-text"> No Orders!</span>
                )}
            
                {activeOrders.map((order) => (
                    <div className="order-container" key={order?.itemId}>
                        <div className="top-container">
                            <div className="order-details-left">
                                <p><b>Date:</b> {datetimeFormat(order?.date)}</p>
                                <p><b>Status:</b> {order?.status}</p>
                            </div>
                            <div className="status-change-right">
                                <button onClick={()=>updateOrderStatus(order._id, getNextStatus(order.status))}>{getAction(order.status)}</button>
                                <button onClick={()=>deleteOrder(order._id)}>Cancel</button>
                            </div>
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