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
                    <button className="nav-btn" onClick={()=> handleNavigate("/addItem")}>Add New Items</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/addItem")}>Update Current Items</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/viewAllOrders")}>View All Orders</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/viewActiveOrders")}>View Active Orders</button>
                </div>
            </div>
        </div>
    )
}