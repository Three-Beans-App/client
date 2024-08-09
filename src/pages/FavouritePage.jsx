import "../styles/pages/FavouritePage.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItem from "../components/MenuItem"
import { useFavouriteData, useFavouriteDispatch } from "../contexts/favouriteContext"
import { useCartDispatch } from "../contexts/cartContext";
import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { useMenuItemDispatch } from "../contexts/menuItemContext";
import { useNavigate } from "react-router-dom";



export default function FavouritePage(){
    const { favouriteList } = useFavouriteData();
    const { onClickStar, fetchFavouriteList } = useFavouriteDispatch();
    const [isItemDetailOpen, setIsItemDetailOpen] = useState(false);
    const [onClickItemDetail, setOnClickItemDetail] = useState(null);
    const { fetchMenuItems, fetchCategories, getFavouriteMenuItems } = useMenuItemDispatch();
    const favouriteMenuItems = getFavouriteMenuItems(favouriteList);
    const { handleAddToCart } = useCartDispatch()


    const direct = useNavigate();
    // navigation route
    const handleDirect = (path) => {
        direct(path);
    }

    // load the data to the page
    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
        fetchFavouriteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function on click the item it will popup
    const handleOpenItemDetail = (item) => {
        setOnClickItemDetail(item);
        setIsItemDetailOpen(true);
    };

    // function to close the popup item
    const handleCloseItemDetail = () => {
        setOnClickItemDetail(null);
        setIsItemDetailOpen(false);
    } ;

    return (
        
        <div id="content-main-box">
            <div id="content-sub-box">
                <div className="head-box">
                     <h1>Favourite Items</h1>
                </div>
                <div className="cart-box">
                    <button onClick={()=>handleDirect("/cart")} id="cartIcon" >
                                <ShoppingCartIcon />
                    </button>
                </div>
            </div>
            <div>
                <div className="items" >
                    {favouriteMenuItems.map((item) => (
                                <MenuItem 
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    image={item.image}
                                    onOpenItemDetail={() => handleOpenItemDetail(item)}
                                    onAddToCart={() => handleAddToCart(item)}
                                    onStarClick={() => onClickStar(item)}
                                />
                            ))}
                </div>    
            </div>
            {isItemDetailOpen && onClickItemDetail && (
                <div id="itemDetail-popup" >
                            <Popup 
                                item={onClickItemDetail}
                                handleCloseItemDetail={handleCloseItemDetail}  
                                onAddToCart={() => handleAddToCart(onClickItemDetail)}
                                onStarClick={() => onClickStar(onClickItemDetail)}
                                className="item-popup"
                            />
                </div>
            )} 
        </div>
    )
}