import "../styles/pages/OrderPage.css";

export default function OrderPage(){

    return(
        <div id="order-main-container">
            <div id="order-sub-container">
                <div className="title-box">
                    <h1>Your order has been received!</h1>
                </div>
                {/* <div className="order-details">
                    <label> Your order status: {order.status} </label>
                </div> */}
                <div className="order-details">
                    <text> Thanks for your purchase. </text>
                </div>
            </div>
        </div>
    )
}