import "../styles/components/MenuSideBar.css"
// Display Menu category
// Coffee
// Tea
// Milkshaks
// Food

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