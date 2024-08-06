import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { useUserData } from "./userContext";
import { API_BASE_URL } from "./variables";


const FavouriteDataContext = createContext(null);
const FavouriteDispatchContext = createContext(null);

export function useFavouriteData(){
    return useContext(FavouriteDataContext);
}

export function useFavouriteDispatch(){
    return useContext(FavouriteDispatchContext);
}

export default function FavouriteProvider({children}){

    const [favouriteList, setFavouriteList] = useState(JSON.parse(localStorage.getItem("favourite-list")) || [])
    const { userJwt, userId } = useUserData();

    // when favouriteList update, add to localStorage
    useEffect(()=> {
        localStorage.setItem("favourite-list", JSON.stringify(favouriteList))
    },[favouriteList])

    // function for add or delete item to favourite list by onClick the star
    const onClickStar = async(item) => {
        
        // find the item id which match the item in the favourite list 
        const favouriteItem = favouriteList.find(favourite => favourite.item.itemId === item._id);
        // store the item whether is in the favourite list, return true or false
        const isAlreadyFavourite = favouriteItem !== undefined;
        

        try{
            // if the item is not in the favourite list, then store the item to the favourite list
            if (!isAlreadyFavourite) {
                const response = await axios.post(`${API_BASE_URL}/favourites/`,
                    {userId, itemId: item._id},
                    {
                        headers: {
                            'Authorization': `Bearer ${userJwt}`
                        }
                    }
                );
                setFavouriteList([...favouriteList, response.data.favourite]);
            } else {

                // else this item already exist in the favourite list, then when onclick, it will delete it from favourite list
                await axios.delete(`${API_BASE_URL}/favourites/${favouriteItem._id}`, {
                    headers: {
                        'Authorization': `Bearer ${userJwt}`
                    },
                    data: {
                        userId
                    }
                });
                setFavouriteList(favouriteList.filter(favourite => favourite.item.itemId !== item._id));
            }
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    };

    // fetch FavouriteList 
    const fetchFavouriteList = async() => {
        try{
            const response = await axios.get(`${API_BASE_URL}/favourites/${userId}`,{
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }});
                setFavouriteList(response.data.result);
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    }


    return (
        <FavouriteDataContext.Provider value={{favouriteList}}>
            <FavouriteDispatchContext.Provider value={{
              onClickStar,
              fetchFavouriteList
        }}>
            {children}
        </FavouriteDispatchContext.Provider>
    </FavouriteDataContext.Provider>)



}