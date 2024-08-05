import "../styles/pages/OrderPage.css";
import React from "react";
import QRCode from "react-qr-code";
import { useOrderData } from "../contexts/orderContext";


export default function OrderPage(){
    const { QRCodeValue, QRorderStatus } = useOrderData();
    
   
    return(
        
        <div id="order-main-container">
            {QRCodeValue && 
            <div className="order-sub-container">
                <div className="title-box">
                    <h1>Your order has been received!</h1>
                </div>
                <div className="order-details">
                    <h3> Your order will be ready in 10 minutes, please show the order QR code to collect your order.</h3>
                </div>
                 <QRCode value={QRCodeValue} className="qc"/>
                <h3> Your order status:  {QRorderStatus}</h3>
                <div className="order-details">
                    
                    <h3> Thanks for your purchase, Have a great day!</h3>
                </div>
            </div>
            }
            {!QRCodeValue && <div className="order-sub-container">This is no pending order!</div>}
        </div>
    )
}