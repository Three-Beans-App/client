import "../styles/pages/FavouritePage.css"
import MenuItem from "../components/MenuItem"
import { useFavouriteData, useFavouriteDispatch } from "../contexts/favouriteContext"
import { useCartDispatch } from "../contexts/cartContext";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { useMenuItemDispatch } from "../contexts/menuItemContext";



export default function FavouritePage(){
    const { favouriteList } = useFavouriteData();
    const { onClickStar, fetchFavouriteList } = useFavouriteDispatch();
    const [isItemDetailOpen, setIsItemDetailOpen] = useState(false);
    const [onClickItemDetail, setOnClickItemDetail] = useState(null);
    const { fetchMenuItems, fetchCategories, getFavouriteMenuItems } = useMenuItemDispatch();
    const favouriteMenuItems = getFavouriteMenuItems(favouriteList);
    const { handleAddToCart } = useCartDispatch()

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
        // <div id="content-main-box">
        //     <div id="content-sub-box">
        //         <section className="top-title">
        //             <h1>My Favourite List</h1>
        //         </section>
        //         <div>
        //             {favouriteList && favouriteList.map((list) => (
        //                 <div className="item-details">
        //                     <div className="item-name-content">{list.item.name}</div>
        //                     <div className="item-content">${list.item.price}</div>
        //                 </div>
        //             ))} 
        //         </div>
        //  </div>
        // </div>
        
        <div id="content-main-box">
            <div id="content-sub-box">
                <h1>My Favourite List</h1>
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