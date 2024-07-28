import { useState, createContext, useContext } from 'react';
import axios from 'axios';

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

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/menu");
            setMenuItems(response.data.result);
        } catch (error) {
            console.error("Error fetching menu items: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3001/menu/categories");
            setCategories(response.data.result);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    const addMenuItem = async (name, category, price, description, image) => {
        try {
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("filename", name);

                await axios.post("http://localhost:3001/menu/upload", formData);
            }

            const response = await axios.post("http://localhost:3001/menu/addItem", {
                name,
                category,
                price,
                description
            });

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
                value={{ fetchMenuItems, fetchCategories, addMenuItem }}
            >
                {children}
            </MenuItemDispatchContext.Provider>
        </MenuItemDataContext.Provider>
    );
}