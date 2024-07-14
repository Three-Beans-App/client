import "../styles/components/ItemDetail.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// x to close the tag
// Item image
// Item name
// Item price
// Item description
// choice of milk (only can select one)
    // full cream
    // skimmy milk
    // almond milk
    // oak milk
    // soy
// choice of sweetners 
    // 1/2 sugar
    // 1 sugar
    // 2 sugar
    // 3 sugar
    // 4 sugar
    // 1 equal
    // 2 equal
// choice of syrup 
    // caramel syrup
    // vanilla syrup
    // hazelnut syrup
// other option
    // decaf
    // half strenght
    // 3/4 full

// number - + 
// add to cart

export default function ItemDetail(){


    return(

        <div id="ItemBigBox" data-closable>
            
            <div id="imageCloseContainer">
                <img src="coffee.png" alt="Description" className="image"/>
                <IconButton aria-label="close" className="IconButton">
                    <CloseIcon />
                </IconButton>
            </div>
            <div id="detail-container">
                <div id="detailBox">
                    <h3>latte</h3>
                    <label>$ 5</label>
                    <p>description</p>
                </div>
                <div> 
                    <label>Choose a milk type:</label>
                    <select id="milkType">
                        <option value="full">Full Cream</option>
                        <option value="skim">Skim Milk</option>
                        <option value="almond">Almond</option>
                        <option value="oat">Oat</option>
                        <option value="soy">Soy</option>
                    </select>  
                </div>
                <div id="option-container">
                    <div id="sweetnerBox">
                        <label>Sweetners:</label>
                        <div id="sweetner-items">
                            <label className="sweetner-options">
                                <span>1/2 Sugar</span> 
                                <input type="checkbox" value="1/2 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span> 1 Sugar </span> 
                                <input type="checkbox" value="1 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>2 Sugar </span>
                                <input type="checkbox" value="2 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>3 Sugar </span>
                                <input type="checkbox" value="3 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>4 Sugar </span>
                                <input type="checkbox" value="4 sugar"/>
                            </label>
                            <label className="sweetner-option">
                                <span>1 Equal </span>
                                <input type="checkbox" value="1 equal"/>
                            </label>
                            <label className="sweetner-option">
                                <span>2 Equal </span>
                                <input type="checkbox" value="2 equal "/>
                            </label>
                            <label className="sweetner-option">
                                <span>3 Equal </span>
                                <input type="checkbox" value="3 equal "/>
                            </label>
                        </div>
                    </div>
                    <div id="syrupBox">
                        <label>Syrups:</label>
                        <div id="syrup-items">
                            <label className="syrup-options">
                                <span>Caramel</span> 
                                <input type="checkbox" value="caramel"/>
                            </label>
                            <label className="syrup-options">
                                <span>Vanilla</span> 
                                <input type="checkbox" value="vanilla"/>
                            </label>
                            <label className="syrup-options">
                                <span>Hazelnut</span> 
                                <input type="checkbox" value="hazelnut"/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
