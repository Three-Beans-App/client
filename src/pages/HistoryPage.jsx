import "../styles/pages/HistoryPage.css";
import { useOrderData, useOrderDispatch } from "../contexts/orderContext";
import { useEffect } from "react";


export default function HistoryPage() {
    // const [orders, setOrders] = useState([
    //     {
    //         id: 1,
    //         photo: "https://example.com/photo1.jpg",
    //         date: "20-07-2024",
    //         status: "Complete",
    //         totalCost: "$15.00"
    //     },
    //     {
    //         id: 2,
    //         photo: "https://example.com/photo2.jpg",
    //         date: "20-07-2024",
    //         status: "Complete",
    //         totalCost: "$6.00"
    //     },
    // ]);

    // const handleDelete = (orderId) => {
    //     setOrders(orders.filter(order => order.id !== orderId));
    // };

    const { userOrderHistory } = useOrderData();
    const { userViewAllOrders } = useOrderDispatch();

    useEffect(() => {
        userViewAllOrders();
    }, [userViewAllOrders]);

    return (
        <div className="order-history">
            <div className="historytitle">
                <h2>Order History</h2>
            </div>
            <div className="order-list">    
                { userOrderHistory.length === 0 && (
                    <span className="empty-text"> History is empty!</span>
                )}
            
                {userOrderHistory.map((order) => (
                    <div className="order-item" key={order.itemId}>
                        
                        <div className="order-details-left">
                            <p>Date: {order.date}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <div className="order-details-right">
                            <p>Total Cost: {order.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
