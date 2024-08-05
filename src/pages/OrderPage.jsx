import "../styles/pages/OrderPage.css";
import React from "react";
import QRCode from "react-qr-code";
import { useOrderData } from "../contexts/orderContext";
import { useNavigate } from "react-router-dom";




export default function OrderPage(){
    const { order } = useOrderData();
    const navigate = useNavigate();


    if (!order) {
        return <div>Loading...</div>;
    }

    const qrcodeValue = `Order ID: ${order._id}`

   
    return(
        
        <div id="order-main-container">
            <div id="order-sub-container">
                <div className="title-box">
                    <h1>Your order has been received!</h1>
                </div>
                <div className="order-details">
                    <h3> Your order will be ready in 10 minutes, please show the order QR code to collect your order.</h3>
                </div>
                {order && <QRCode value={qrcodeValue} className="qc"/>}
            
                <div className="order-details">
                    <h3> Thanks for your purchase, Have a great day!</h3>
                </div>
            </div>
        </div>
    )
}