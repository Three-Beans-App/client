import "../styles/pages/HistoryPage.css";
import { useState } from 'react';

export default function HistoryPage() {
    const [orders, setOrders] = useState([
        {
            id: 1,
            photo: "https://example.com/photo1.jpg",
            date: "20-07-2024",
            status: "Complete",
            totalCost: "$15.00"
        },
        {
            id: 2,
            photo: "https://example.com/photo2.jpg",
            date: "20-07-2024",
            status: "Complete",
            totalCost: "$6.00"
        },
    ]);

    const handleDelete = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    return (
        <div className="order-history">
            <div className="historytitle">
                <h2>Order History</h2>
            </div>
            <div className="order-list">
                {orders.map(order => (
                    <div className="order-item" key={order.id}>
                        <img src={order.photo} alt={`Order ${order.id}`} className="order-photo" />
                        <div className="order-details-left">
                            <p>Date: {order.date}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <div className="order-details-right">
                            <p>Total Cost: {order.totalCost}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
