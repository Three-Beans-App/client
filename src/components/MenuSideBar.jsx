import "../styles/components/MenuSideBar.css"
import React from "react";

export default function MenuSideBar({categories, onSelectedCategory}){

    return(
        <div id="menuSideBarContainer">
            {categories.map(category => (
                <button key={category.name} onClick={() => onSelectedCategory(category)}>
                    {category.name}
                </button>
            ))}
        </div>
    )
}