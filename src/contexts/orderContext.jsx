import axios from 'axios';
import { createContext, useContext, useState } from "react";
import { useUserData } from "../contexts/userContext"
import { useCartData } from './cartContext';


const OrderDataContext = createContext(null);
const OrderDispatchContext = createContext(null);

export function useOrderData(){
   return useContext(OrderDataContext);
};

export function useOrderDispatch(){
    return useContext(OrderDispatchContext);
};

export default function OrderProvider({ children }){

    const [ userOrderHistory, setUserOrderHistory ] = useState([]);
    const [ order, setOrder ] = useState({});
    const { userId, userJwt } = useUserData();
    const [ allOrders, setAllOrders ] = useState([]);
    const [ activeOrders, setActiveOrders ] = useState([]);

    const { cartItems } = useCartData();
    // view all the order history by User id

    const userViewAllOrders = async() => {
        try {

            const id = userId;
            const historyUrl=`http://localhost:3001/orders/user/${id}`;

            const response = await axios.get(historyUrl, {
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }
            });
            setUserOrderHistory(response.data.result);
            console.log(response.data.result)
        } catch (error) {
            console.error("Error fetching user order history: ", error);
        }
    }

    // user create new order 
    const userCreateOrder = async({ guestUser, userId }) => {

        const cartItemsOrder = cartItems.map(item => ({
            itemId: item.item._id,
            quantity: item.quantity
        }));

        const orderDetail = {
            userId: userId,
            guestUser: guestUser,
            items: cartItemsOrder
        };
        
        try {
            const response = await axios.post("http://localhost:3001/orders/", orderDetail);
            setOrder(response.data.result);
            setUserOrderHistory(existHistory => [...existHistory, response.data.result])
        }catch(error) {
            console.error("Error user create order: ", error)
        }


    }
    // admin view all the order
    const adminViewAllOrders = async() => {
        try {
           
            const response = await axios.get("http://localhost:3001/orders/",{
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }});
            setAllOrders(response.data.result);
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    }

    // // admin view order by status
    // const adminViewOrdersByStatus = async() => {
    //     try {
    //        const statusUrl = `http://localhost:3001/orders/`
    //         const response = await axios.get("http://localhost:3001/orders/",{
    //             headers: {
    //                 'Authorization': `Bearer ${userJwt}`
    //             }});
    //         setAllOrders(response.data.result);
    //     }catch(error) {
    //         console.error("Error user create order: ", error)
    //     }
    // }


    // admin view all the active orders
    const adminViewActiveOrders = async() => {
        try{
            const response = await axios.get("http://localhost:3001/orders/active",{
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }});
            setActiveOrders(response.data.result);
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    }
    


    // update order status
    const updateOrderStatus = async(id, status) => {
        try{
           
            const updateOrderUrl = `http://localhost:3001/orders/status/${id}`
            const response = await axios.patch(updateOrderUrl, 
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${userJwt}`
                    }
                }
            );

            // update status in local
            if (response.status === 200) {
                // update local values
                console.log(activeOrders.filter(order => !(order._id === id && status === "completed" && status === "cancelled")))
                if (status === "completed" || status === "cancelled") {
                    setActiveOrders(activeOrders.filter(order => order._id !== id));
                } else {
                    setActiveOrders(activeOrders.map(order => order._id === id ? { ...order, status } : order));
                }
                setAllOrders(allOrders.map(order => order._id === id ? { ...order, status } : order));
            }

        }catch(error){
            console.error("Error user create order: ", error)
        }
    }


    // Delte order
    const deleteOrder = async(id) => {
        try{
           
            const updateOrderUrl = `http://localhost:3001/orders/deleteOrder/${id}`
            const response = await axios.delete(updateOrderUrl,
                {
                    headers: {
                        'Authorization': `Bearer ${userJwt}`
                    }
                }
            );
            // update status in local
            if (response.status === 200) {
                // update local values
                setActiveOrders(activeOrders.filter(order => order._id !== id));
                setAllOrders(allOrders.filter(order => order._id !== id));
            }

        }catch(error){
    console.error("Error user create order: ", error)
    }
    }


    return (
        <OrderDataContext.Provider value={{userOrderHistory, order, allOrders, activeOrders}}>
            <OrderDispatchContext.Provider 
            value={{ 
                userViewAllOrders,
                userCreateOrder, 
                adminViewAllOrders, 
                adminViewActiveOrders, 
                updateOrderStatus, 
                deleteOrder }}>
                {children}
            </OrderDispatchContext.Provider>
        </OrderDataContext.Provider>
    )
}

