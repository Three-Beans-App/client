import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { useUserData } from "./userContext";


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

    // function for add item to favourite list
    const onClickStar = async(item) => {
        const favouriteItem = favouriteList.find(favourite => favourite.item.itemId === item._id);
        const isAlreadyFavourite = favouriteItem !== undefined;
        
        try{
            if (!isAlreadyFavourite) {
                const response = await axios.post("http://localhost:3001/favourites/",
                    {userId, itemId: item._id},
                    {
                        headers: {
                            'Authorization': `Bearer ${userJwt}`
                        }
                    }
                );
                setFavouriteList([...favouriteList, response.data.favourite]);
            } else {
                await axios.delete(`http://localhost:3001/favourites/${favouriteItem._id}`, {
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
            const response = await axios.get(`http://localhost:3001/favourites/${userId}`,{
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