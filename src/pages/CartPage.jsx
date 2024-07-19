import "../styles/pages/CartPage.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



export default function CartPage(){



    return(
        <div id="cart-container">
            
             <h1>This is cart page!!!</h1>
            <label>This is cart icon</label>
            <div id="icon">
                <AddShoppingCartIcon  />
                <RemoveCircleOutlineIcon />
                <AddCircleOutlineIcon />
            </div>
            

        </div>
    )
}