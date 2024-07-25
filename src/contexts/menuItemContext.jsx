import { useState, createContext, useContext } from 'react';

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
            const response = await fetch("http://localhost:3001/menu");
            const data = await response.json();
            setMenuItems(data.result);
        } catch (error) {
            console.error("Error fetching menu items: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3001/menu/categories");
            const data = await response.json();
            setCategories(data.result);
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

                await fetch("http://localhost:3001/menu/upload", {
                    method: "POST",
                    body: formData
                });
            }

            const response = await fetch("http://localhost:3001/menu/addItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, category, price, description })
            });

            if (response.ok) {
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