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

    // admin view order by status

    // admin view all the active orders

    // update order status


    return (
        <OrderDataContext.Provider value={{userOrderHistory, order}}>
            <OrderDispatchContext.Provider 
            value={{ userViewAllOrders, userCreateOrder }}>
                {children}
            </OrderDispatchContext.Provider>
        </OrderDataContext.Provider>
    )
}

