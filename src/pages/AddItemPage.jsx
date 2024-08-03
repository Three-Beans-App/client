import '../styles/pages/AddItemPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuItemDispatch } from '../contexts/menuItemContext';
import { useUserData } from '../contexts/userContext';


export default function AddItemPage() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const { addMenuItem } = useMenuItemDispatch();
    const { isAdmin } = useUserData();


    const handlePriceChange = (value) => {
        const validValue = /^(?!$)(\d{1,10}(\.\d{0,2})?|\.?\d{1,2})$/;
        if (value === "" || validValue.test(value)) {
            setPrice(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addMenuItem(name, category, price, description, imageUrl);
        navigate("/menu");
    };
    
    if (!isAdmin) {
        return null;
    }

    return (
        <div id="addItem-container">
            <div id="inner-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label className="input-label"> Name</label>
                        <input className="input-content" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                    </section>
                    <section>
                        <label className="input-label"> Category</label>
                        <input className="input-content" type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
                    </section>
                    <section>
                        <label className="input-label"> Price</label>
                        <input className="input-content" type="text" value={price} onChange={(event) => handlePriceChange(event.target.value)} required />
                    </section>
                    <section>
                        <label className="input-label"> Description </label>
                        <textarea className="input-content" rows="6" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </section>
                    <section>
                        <label className="input-label"> Image Url</label>
                        <input className="input-content" type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                        <div id="imageContainer">
                            <img src={imageUrl !== "" ? imageUrl : 'https://via.placeholder.com/250x250?text=No+Image'} alt="Invalid URL"/>                       
                        </div>
                    </section>
                    <section>
                        <button className="submit-btn" type="submit">Add Item</button>
                    </section>
                </form>
            </div>
        </div>
    );
}