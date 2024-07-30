import "../styles/components/Footer.css"
import { useNavigate } from 'react-router-dom';

export default function Footer(){

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path)
    }
 

    return(
        <footer>
            <h3 className="copyright">Copyright 2024 Three Beans Cafe</h3>
            <button className="admin-btn" onClick={()=> handleNavigate("/admin")}>Admin</button>
        </footer>
    )
}