import { useNavigate } from 'react-router-dom';
import "../styles/pages/AdminPage.css"

export default function AdminPage(){


    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }

    return (

        <div id="admin-container">
            <div id="admin-sub-container">
                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/addItem")}>Add a new Item</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/addItem")}>Update an existing item</button>
                </div>
            </div>
        </div>
    )
}