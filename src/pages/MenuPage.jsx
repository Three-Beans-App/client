import "../styles/pages/MenuPage.css"
import MenuSideBar from "../components/MenuSideBar"
import MenuItem from "../components/MenuItem";
import { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import {useMenuItemData, useMenuItemDispatch } from "../contexts/menuItemContext"
import { useCartDispatch, useCartData } from "../contexts/cartContext";



export default function MenuPage(){

    const { notice } = useCartData();
    // const { menuItems, categories } = useMenuItemData();
    // const { fetchMenuItems, fetchCategories } = useMenuItemDispatch();

    // useEffect(() => {
    //     fetchMenuItems();
    //     fetchCategories();
    // }, [fetchMenuItems, fetchCategories]);

    const getRandomImageUrl = () => {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
    };

    const imageUrls = [
        "https://images.unsplash.com/photo-1496042399014-dc73c4f2bde1",
        "https://images.unsplash.com/photo-1648999599232-fd999a6b1d91",
        "https://images.unsplash.com/photo-1714799263245-4fc7cc21911e",
        "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32",
        "https://images.unsplash.com/photo-1608070734668-e74dc3dda037",
    ]
    // mock data
    const menuItems = [
        // Coffee
        {
            name: "Flat White",
            category: "Coffee",
            price: 5.50,
            quantity: 100,
            description: "Medium flat white coffee to go",
            image: getRandomImageUrl(),
        },
        {
            name: "Cappuccino",
            category: "Coffee",
            price: 6.00,
            quantity: 100,
            description: "Large cappuccino with chocolate on top",
            image: "coffee.png",
        },
        {
            name: "Long Black",
            category: "Coffee",
            price: 5.00,
            quantity: 100,
            description: "Large long black coffee to go",
            image: "coffee.png",
        },
        {
            name: "Latte",
            category: "Coffee",
            price: 6.50,
            quantity: 100,
            description: "Nice latte for drinking",
            image: "coffee.png",
        },
        {
            name: "Espresso",
            category: "Coffee",
            price: 4.00,
            quantity: 100,
            description: "Strong and bold espresso",
            image: "coffee.png",
        },
        {
            name: "Mocha",
            category: "Coffee",
            price: 6.50,
            quantity: 100,
            description: "Chocolate-flavored coffee",
            image: "coffee.png",
        },
        {
            name: "Macchiato",
            category: "Coffee",
            price: 5.50,
            quantity: 100,
            description: "Espresso with a dash of frothy milk",
            image: "coffee.png",
        },
        {
            name: "Affogato",
            category: "Coffee",
            price: 7.00,
            quantity: 100,
            description: "Espresso poured over a scoop of ice cream",
            image: "coffee.png",
        },
        {
            name: "Cold Brew",
            category: "Coffee",
            price: 6.00,
            quantity: 100,
            description: "Smooth cold brew coffee",
            image: "coffee.png",
        },
        {
            name: "Irish Coffee",
            category: "Coffee",
            price: 8.00,
            quantity: 100,
            description: "Coffee with Irish whiskey",
            image: "coffee.png",
        },
        {
            name: "Café au Lait",
            category: "Coffee",
            price: 5.50,
            quantity: 100,
            description: "Coffee with hot milk",
            image: "coffee.png",
        },
        // Tea
        {
            name: "Green Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Refreshing green tea",
            image: "coffee.png",
        },
        {
            name: "Black Tea",
            category: "Tea",
            price: 4.00,
            quantity: 100,
            description: "Bold black tea",
            image: "coffee.png",
        },
        {
            name: "Earl Grey",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Flavored with bergamot",
            image: "coffee.png",
        },
        {
            name: "Chamomile Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Calming chamomile tea",
            image: "coffee.png",
        },
        {
            name: "Mint Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Refreshing mint tea",
            image: "coffee.png",
        },
        {
            name: "Oolong Tea",
            category: "Tea",
            price: 5.00,
            quantity: 100,
            description: "Smooth oolong tea",
            image: "coffee.png",
        },
        {
            name: "Jasmine Tea",
            category: "Tea",
            price: 5.00,
            quantity: 100,
            description: "Fragrant jasmine tea",
            image: "coffee.png",
        },
        {
            name: "Chai Tea",
            category: "Tea",
            price: 5.50,
            quantity: 100,
            description: "Spiced chai tea",
            image: "coffee.png",
        },
        {
            name: "Lemon Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Zesty lemon tea",
            image: "coffee.png",
        },
        {
            name: "Hibiscus Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Tart hibiscus tea",
            image: "coffee.png",
        },
        {
            name: "Peppermint Tea",
            category: "Tea",
            price: 4.50,
            quantity: 100,
            description: "Cool peppermint tea",
            image: "coffee.png",
        },
        {
            name: "Rooibos Tea",
            category: "Tea",
            price: 5.00,
            quantity: 100,
            description: "South African red tea",
            image: "coffee.png",
        },
        // Milkshakes
        {
            name: "Vanilla Milkshake",
            category: "Milkshakes",
            price: 6.00,
            quantity: 100,
            description: "Classic vanilla milkshake",
            image: "coffee.png",
        },
        {
            name: "Chocolate Milkshake",
            category: "Milkshakes",
            price: 6.50,
            quantity: 100,
            description: "Rich chocolate milkshake",
            image: "coffee.png",
        },
        {
            name: "Strawberry Milkshake",
            category: "Milkshakes",
            price: 6.50,
            quantity: 100,
            description: "Sweet strawberry milkshake",
            image: "coffee.png",
        },
        {
            name: "Banana Milkshake",
            category: "Milkshakes",
            price: 6.00,
            quantity: 100,
            description: "Creamy banana milkshake",
            image: "coffee.png",
        },
        {
            name: "Mango Milkshake",
            category: "Milkshakes",
            price: 7.00,
            quantity: 100,
            description: "Tropical mango milkshake",
            image: "coffee.png",
        },
        {
            name: "Oreo Milkshake",
            category: "Milkshakes",
            price: 7.00,
            quantity: 100,
            description: "Cookies and cream milkshake",
            image: "coffee.png",
        },
        {
            name: "Peanut Butter Milkshake",
            category: "Milkshakes",
            price: 7.50,
            quantity: 100,
            description: "Rich peanut butter milkshake",
            image: "coffee.png",
        },
        {
            name: "Coffee Milkshake",
            category: "Milkshakes",
            price: 7.00,
            quantity: 100,
            description: "Coffee-flavored milkshake",
            image: "coffee.png",
        },
        {
            name: "Mint Chocolate Milkshake",
            category: "Milkshakes",
            price: 7.50,
            quantity: 100,
            description: "Refreshing mint chocolate milkshake",
            image: "coffee.png",
        },
        // Food
        {
            name: "Avocado Toast",
            category: "Food",
            price: 8.00,
            quantity: 100,
            description: "Avocado spread on toast",
            image: "coffee.png",
        },
        {
            name: "Blueberry Muffin",
            category: "Food",
            price: 4.00,
            quantity: 100,
            description: "Fresh blueberry muffin",
            image: "coffee.png",
        },
        {
            name: "Chicken Caesar Salad",
            category: "Food",
            price: 10.00,
            quantity: 100,
            description: "Classic Caesar salad with chicken",
            image: "coffee.png",
        },
        {
            name: "Veggie Wrap",
            category: "Food",
            price: 9.00,
            quantity: 100,
            description: "Healthy veggie wrap",
            image: "coffee.png",
        },
        {
            name: "Ham and Cheese Sandwich",
            category: "Food",
            price: 7.00,
            quantity: 100,
            description: "Classic ham and cheese sandwich",
            image: "coffee.png",
        },
        {
            name: "Fruit Salad",
            category: "Food",
            price: 6.00,
            quantity: 100,
            description: "Mixed fresh fruit salad",
            image: "coffee.png",
        },
        {
            name: "Bagel with Cream Cheese",
            category: "Food",
            price: 5.50,
            quantity: 100,
            description: "Bagel with a generous spread of cream cheese",
            image: "coffee.png",
        },
        {
            name: "Granola Bar",
            category: "Food",
            price: 3.50,
            quantity: 100,
            description: "Healthy granola bar",
            image: "coffee.png",
        },
        {
            name: "Turkey Club Sandwich",
            category: "Food",
            price: 9.00,
            quantity: 100,
            description: "Delicious turkey club sandwich",
            image: "coffee.png",
        },
        {
            name: "Chocolate Chip Cookie",
            category: "Food",
            price: 2.50,
            quantity: 100,
            description: "Classic chocolate chip cookie",
            image: "coffee.png",
        },
        {
            name: "Quiche Lorraine",
            category: "Food",
            price: 7.50,
            quantity: 100,
            description: "Savory quiche with bacon and cheese",
            image: "coffee.png",
        },
        {
            name: "Tomato Basil Soup",
            category: "Food",
            price: 6.00,
            quantity: 100,
            description: "Warm tomato basil soup",
            image: "coffee.png",
        },
        {
            name: "Pancakes with Maple Syrup",
            category: "Food",
            price: 8.00,
            quantity: 100,
            description: "Fluffy pancakes served with maple syrup",
            image: "coffee.png",
        },
        {
            name: "Greek Yogurt Parfait",
            category: "Food",
            price: 5.50,
            quantity: 100,
            description: "Greek yogurt with granola and fruit",
            image: "coffee.png",
        },
        {
            name: "BLT Sandwich",
            category: "Food",
            price: 7.00,
            quantity: 100,
            description: "Bacon, lettuce, and tomato sandwich",
            image: "coffee.png",
        },
        {
            name: "Chicken Quesadilla",
            category: "Food",
            price: 9.50,
            quantity: 100,
            description: "Grilled chicken quesadilla",
            image: "coffee.png",
        },
        {
            name: "Cinnamon Roll",
            category: "Food",
            price: 4.50,
            quantity: 100,
            description: "Sweet cinnamon roll",
            image: "coffee.png",
        },
        {
            name: "Egg Salad Sandwich",
            category: "Food",
            price: 6.00,
            quantity: 100,
            description: "Classic egg salad sandwich",
            image: "coffee.png",
        },
        {
            name: "Apple Pie Slice",
            category: "Food",
            price: 5.00,
            quantity: 100,
            description: "Slice of homemade apple pie",
            image: "coffee.png",
        },
        {
            name: "Hummus and Veggie Plate",
            category: "Food",
            price: 6.50,
            quantity: 100,
            description: "Hummus served with fresh veggies",
            image: "coffee.png",
        },
        {
            name: "Cheese Platter",
            category: "Food",
            price: 12.00,
            quantity: 100,
            description: "Selection of fine cheeses",
            image: "coffee.png",
        },
        {
            name: "BBQ Chicken Pizza",
            category: "Food",
            price: 10.00,
            quantity: 100,
            description: "Personal BBQ chicken pizza",
            image: "coffee.png",
        },
    ];
     // mock data
    const categories = [
        {
            name: "Coffee",
        },
        {
            name: "Tea",
        },
        {
            name: "Milkshakes",
        },
        {
            name: "Food",
        },
    ];


    const direct = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isItemDetaillOpen, setIsItemDetaillOpen] = useState(false);
    const [onClickItemDetail, setOnClickItemDetail] = useState(null);

    const { handleAddToCart } = useCartDispatch()


    

    const setSearchValue = (event) => {
        setSearchTerm(event.target.value);
    };

    const selectedMenuItems = menuItems.filter(item => 
        item.category === selectedCategory.name && 
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "")
    );

    const handleDirect = (path) => {
        direct(path);
    }

    const handleOpenItemDetail = (item) => {
        setOnClickItemDetail(item);
        setIsItemDetaillOpen(true);
    };

    const handleCloseItemDetail = () => {
        setOnClickItemDetail(null);
        setIsItemDetaillOpen(false);
    } ;


    const handleStarClick = (item) => {
        // Implement the logic for star click
        console.log("Star clicked:", item);
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
            {notice && <div className="add-cart-notice">{notice}</div>}
            <div id="itemBox">
                <div id="titleAndSearchBox">
                    <div className="title">{selectedCategory.name}</div>
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
                        
                            <ShoppingCartIcon  />
                        </button>
                    </div>
                </div>
            
                <div className="items" >
                    {selectedMenuItems.map((item) => (
                        <div>
                        <MenuItem 
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                            onOpenItemDetail={() => handleOpenItemDetail(item)}
                            onAddToCart={() => handleAddToCart(item)}
                            onStarClick={() => handleStarClick(item)}
                        />
                        </div>
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