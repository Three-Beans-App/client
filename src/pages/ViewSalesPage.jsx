import React, { useEffect } from "react";
import "../styles/pages/ViewSalesPage.css"
import { useOrderData, useOrderDispatch } from "../contexts/orderContext";



export default function ViewSalesPage() {

    const { allOrders } = useOrderData();
    const { adminViewAllOrders } = useOrderDispatch()

    // call the function to admin view all the orders
    useEffect(() => {
        adminViewAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // date format to set today's date
    const dateFormat = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // split the date to filter data
    const splitDate =(isoString) => {
        return isoString.split("T")[0];
    }

    const today = new Date();
    const newToday = dateFormat(today)

    // query orders by the date match to today's date
    const queryOrder = (date) => {
        
        return allOrders.filter(order => splitDate(order.date) === date
        ); 
    }
    
    // store today's total orders
    const totalOrderForToday = queryOrder(newToday)
   
     // caculate the total price of all the orders
     const getTotalPriceOfAllOrders = () => {
        const total = totalOrderForToday.reduce((total, order) => {
            return total + order.totalPrice;
        }, 0);
        return total.toFixed(2);
    }

    const todaySales = getTotalPriceOfAllOrders();
        

    return(
        <div className="sale-container">
            <div className="sale-sub-container">
                    <div>
                        <h1>Today Sales Total:</h1>
                        <h2>${todaySales}</h2>
                    </div>
            </div>
        </div>
    )
}