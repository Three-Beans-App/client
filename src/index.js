import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from "./contexts/userContext.jsx";
import MenuItemProvider from './contexts/menuItemContext.jsx';
import CartProvider from './contexts/cartContext.jsx';
import OrderProvider from './contexts/orderContext.jsx';
import FavouriteProvider from './contexts/favouriteContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <UserProvider>
    <FavouriteProvider>
      <MenuItemProvider>
          <CartProvider>
              <OrderProvider>
                <BrowserRouter>     
                  <App />   
                </BrowserRouter>     
                </OrderProvider>
            </CartProvider>
        </MenuItemProvider>
      </FavouriteProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
