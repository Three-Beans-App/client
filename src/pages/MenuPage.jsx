import "../styles/pages/MenuPage.css"
import MenuSideBar from "../components/MenuSideBar"
import MenuItem from "../components/MenuItem";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import {useMenuItemData, useMenuItemDispatch } from "../contexts/menuItemContext"
import { useCartDispatch } from "../contexts/cartContext";
import { useFavouriteDispatch } from "../contexts/favouriteContext";


export default function MenuPage(){

    const { menuItems, categories } = useMenuItemData();
    const { fetchMenuItems, fetchCategories } = useMenuItemDispatch();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isItemDetaillOpen, setIsItemDetaillOpen] = useState(false);
    const [onClickItemDetail, setOnClickItemDetail] = useState(null);
    const { onClickStar, fetchFavouriteList } = useFavouriteDispatch();
    const { handleAddToCart } = useCartDispatch()
    const direct = useNavigate();

    // store the whether user selete the category value, if not, set the first category as default
    const actualSelectedCategory = selectedCategory ? selectedCategory : categories[0];

    // call the function to load the menu items, categaories and favourites
    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
        fetchFavouriteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // when the search bar has value when set the set the value to it
    const setSearchValue = (event) => {
        setSearchTerm(event.target.value);
    };

    // filter the items by category 
    const selectedMenuItems = menuItems.filter(item => 
        item.category === actualSelectedCategory?._id && 
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "")
    );

    // navigation route
    const handleDirect = (path) => {
        direct(path);
    }

     // function on click the item it will popup
    const handleOpenItemDetail = (item) => {
        setOnClickItemDetail(item);
        setIsItemDetaillOpen(true);
    };

     // function to close the popup item
    const handleCloseItemDetail = () => {
        setOnClickItemDetail(null);
        setIsItemDetaillOpen(false);
    } ;

    // funciton for handle start on click 
    const handleStarClick = (item) => {
        onClickStar(item);
    };

    return(
        <div id="menuContainer">
            <div id="sideBar">
                <div id="header">
                    Menu
                </div>
                {categories && (
                <MenuSideBar categories={categories} onSelectedCategory={setSelectedCategory}/>
                )}
            </div>
            
            <div id="itemBox">
                <div id="titleAndSearchBox">
                    <div className="title">{actualSelectedCategory?.name}</div>
                    <div id="searchAndCartIcon">
                        <div className="searchBar">
                            <form>
                                <input 
                                    type="text" 
                                    placeholder="Search Item" 
                                    name="searchTerm" 
                                    onChange={setSearchValue} 
                                />
                            </form>
                        </div>
                        <button onClick={()=>handleDirect("/cart")} id="cartIcon" >
                            <ShoppingCartIcon />
                        </button>
                    </div>
                </div>
                {/* {notice && <div className="add-cart-notice">{notice}</div>} */}
                <div className="items" >
                    {selectedMenuItems.map((item) => (
                        <MenuItem 
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                            onOpenItemDetail={() => handleOpenItemDetail(item)}
                            onAddToCart={() => handleAddToCart(item)}
                            onStarClick={() => handleStarClick(item)}
                        />
                    ))}
                </div>  
                
            </div>
            <div id="itemDetail-popup" >
                    {isItemDetaillOpen && onClickItemDetail && (
                        <Popup 
                        item={onClickItemDetail}
                        handleCloseItemDetail={handleCloseItemDetail}  
                        onAddToCart={() => handleAddToCart(onClickItemDetail)}
                        onStarClick={() => handleStarClick(onClickItemDetail)}
                        className="item-popup"/>
                    )} 
            </div>
        </div>
    )
}