import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useUserData } from './userContext';
import { API_BASE_URL } from './variables';

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

    // filter the favourite list items by the favouriteList ids
    const getFavouriteMenuItems = (favouriteList) => {
        return menuItems.filter(menuItem =>
            favouriteList.some(favourite => favourite.item.itemId === menuItem._id)
        ); 
    }

    // get all the menu items from database
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu/items/`);
            setMenuItems(response.data.result);
        } catch (error) {
            console.error("Error fetching menu items: ", error);
        }
    };


    // get all the categories from database
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu/categories/`);
            setCategories(response.data.result);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    // add a new item to database
    const addMenuItem = async (name, category, price, description, image) => {
        try {

            const response = await axios.post(`${API_BASE_URL}/menu/create/item/`, {
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


    // update an existing item 
    const updateMenuItem = async (id, name, category, price, description, image) => {

        try {
            const updateItemUrl =`${API_BASE_URL}/menu/update/item/${id}`
            await axios.patch(updateItemUrl, {
                name,
                category,
                price,
                description,
                image
            },
            {headers: {
                'Authorization': `Bearer ${userJwt}`
            }});
        } catch (error) {
            console.error("Error adding menu item: ", error);
        }
    }

    // find an item by the item id
    const getMenuItemById = (id) => {
        return menuItems.find(item => id === item._id);
    }


    // delete an item by the item id
    const deleteMenuItem = async(id) =>{
        try {
            const deleteItemUrl =`${API_BASE_URL}/menu/delete/item/${id}`
            console.log(deleteItemUrl)
            await axios.delete(deleteItemUrl, {
               headers: {
                'Authorization': `Bearer ${userJwt}`
                }
            });
        } catch (error) {
            console.error("Error adding menu item: ", error);
        }
    }

    return (
        <MenuItemDataContext.Provider value={{ menuItems, categories }}>
            <MenuItemDispatchContext.Provider 
                value={{ 
                    fetchMenuItems, 
                    fetchCategories, 
                    addMenuItem, 
                    getFavouriteMenuItems, 
                    updateMenuItem,
                    getMenuItemById,
                    deleteMenuItem
                    }}
            >
                {children}
            </MenuItemDispatchContext.Provider>
        </MenuItemDataContext.Provider>
    );
}