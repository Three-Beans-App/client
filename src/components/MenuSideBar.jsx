import "../styles/components/MenuSideBar.css"


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