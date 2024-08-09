import React from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useFavouriteData } from '../contexts/favouriteContext';

export default function Star({itemId}){
    const { favouriteList } = useFavouriteData();
    const isStarred = favouriteList?.some(favourite => favourite?.item.itemId === itemId);

    return(
        <div className="star">
            {isStarred ? <StarOutlinedIcon /> :  <StarBorderIcon/>}
        </div>
    )
}