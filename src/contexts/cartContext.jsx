import { useState, useEffect, createContext, useContext } from "react";


const CartDataContext = createContext(null);
const CartDispatchContext = createContext(null);

export function useCartData(){
    return useContext(CartDataContext);
}

export function useCartDispatch(){
    return useContext(CartDispatchContext);
}

export default function CartProvider({children}){

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("shopping-cart")) || [])
    const [notice, setNotice] = useState("");

    useEffect(()=> {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems))
    },[cartItems])

    // function for add item to cart
    const handleAddToCart = (item) => {
        // check item whether already exists in the cart
        const checkItem = cartItems.find(cartItem=>(cartItem.item.name === item.name))
        // if item exists, count + 1
        if (checkItem){
          //map to the cart item list.
          setCartItems(cartItems.map(cartItem => {
              if (cartItem.item.name === item.name){
                  return {
                      ...cartItem,
                      count: cartItem.count + 1
                  }
              } else {
                  return cartItem
              }
          }))
        }else{
          // if not add new item to the cart list
          setCartItems([...cartItems, {item, count: 1}])
        }

        setNotice(`You has been added ${item.name} to the cart`);
        setTimeout(() => setNotice(""), 4000);
      };

   
    const handleQuantityChange =(name, count)=> {
        setCartItems(cartItems.map(cartItem => {
            if (cartItem.item.name === name){
                return{
                    ...cartItem, 
                    count: parseInt(count)
                };
            }
            else{
                return cartItem;
            }
        }))
    };
   
    const handleRemoveItem =(name) =>{
        setCartItems(cartItems.filter(cartItem=>(cartItem.item.name !== name)))
    }

    

    return (
        <CartDataContext.Provider value={{cartItems, notice}}>
            <CartDispatchContext.Provider value={{
         
            handleAddToCart,
            handleQuantityChange,
            handleRemoveItem
        
        }}>
            {children}
        </CartDispatchContext.Provider>
    </CartDataContext.Provider>)
}