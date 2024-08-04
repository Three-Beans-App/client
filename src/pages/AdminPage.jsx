import { useNavigate } from 'react-router-dom';
import "../styles/pages/AdminPage.css"
import { useUserData } from '../contexts/userContext';

export default function AdminPage(){

    const { isAdmin } = useUserData();

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div id="admin-container">
            <div id="admin-sub-container">
                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/add-item")}>Add New Items</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate(`/menu`)}>Update Current Items</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/view-all-orders")}>View All Orders</button>
                </div>

                <div>
                    <button className="nav-btn" onClick={()=> handleNavigate("/view-active-orders")}>View Active Orders</button>
                </div>
            </div>
        </div>
    )
}