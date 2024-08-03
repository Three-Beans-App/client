import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useUserData } from './userContext';

const MenuItemDataContext = createContext(null);
const MenuItemDispatchContext = createContext(null);

export function useMenuItemData() {
    return useContext(MenuItemDataContext);
};

export function useMenuItemDispatch() {
    return useContext(MenuItemDispatchContext);
};

export default function MenuItemProvider({ children }) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const { userJwt } = useUserData();

    const getFavouriteMenuItems = (favouriteList) => {
        return menuItems.filter(menuItem =>
            favouriteList.some(favourite => favourite.item.itemId === menuItem._id)
        ); 
    }

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/menu/items/");
            setMenuItems(response.data.result);
        } catch (error) {
            console.error("Error fetching menu items: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3001/menu/categories/");
            setCategories(response.data.result);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    const addMenuItem = async (name, category, price, description, image) => {
        try {

            const response = await axios.post("http://localhost:3001/menu/create/item/", {
                name,
                category,
                price,
                description,
                image
            },
            {headers: {
                'Authorization': `Bearer ${userJwt}`
            }});

            if (response.status === 201) {
                fetchMenuItems();
            }
        } catch (error) {
            console.error("Error adding menu item: ", error);
        }
    };


    return (
        <MenuItemDataContext.Provider value={{ menuItems, categories }}>
            <MenuItemDispatchContext.Provider 
                value={{ fetchMenuItems, fetchCategories, addMenuItem, getFavouriteMenuItems }}
            >
                {children}
            </MenuItemDispatchContext.Provider>
        </MenuItemDataContext.Provider>
    );
}