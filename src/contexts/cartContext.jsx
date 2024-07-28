import { useState, createContext, useContext } from "react";


const CartDataContext = createContext(null);
const CartDispatchContext = createContext(null);

export function useCartData(){
    return useContext(CartDataContext);
}

export function useCartDispatch(){
    return useContext(CartDispatchContext);
}

export default function CartProvider({children}){

    /*
    [
        {
            numItems: 2,
            name: "Large Coffee",
            customisation: null
        },
        {
            numItems: 1,
            name: "Muffin",
            customisation: null
        }
    ]
    */

    const [cartItems, setCartItems] = useState([])
	

    // function for add item to cart
    const handleAddToCart = (item) => {
        // check item whether already exists in the cart
        const checkItem = cartItems.find(cartItem=>(cartItem.name === item.name))
        // if item exists, count + 1
        if (checkItem){
          //map to the cart item list.
          setCartItems(cartItems.map(cartItem => {
              if (cartItem.name === item.name){
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
      };
   
    const handleQuantityChange =(name, count)=> {
        setCartItems(cartItems.map(cartItem => {
            if (cartItem === name){
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
   
    const handleRemoveItem =(item) =>{
        setCartItems(cartItems.filter(cartItem=>(cartItem.name !== item.name)))
    }

    

    return (
        <CartDataContext.Provider value={{cartItems}}>
            <CartDispatchContext.Provider value={{
         
            handleAddToCart,
            handleQuantityChange,
            handleRemoveItem
        
        }}>
            {children}
        </CartDispatchContext.Provider>
    </CartDataContext.Provider>)
}