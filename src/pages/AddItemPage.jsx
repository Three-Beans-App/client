import '../styles/pages/AddItemPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuItemData, useMenuItemDispatch } from '../contexts/menuItemContext';
import { useUserData } from '../contexts/userContext';
import { useParams } from 'react-router-dom';


export default function AddItemPage() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const { addMenuItem, updateMenuItem, getMenuItemById, fetchMenuItems, fetchCategories, deleteMenuItem } = useMenuItemDispatch();
    const { categories } = useMenuItemData();
    const { isAdmin } = useUserData();
    const { id } = useParams();
    

    useEffect(() => {
        const getCategoryName = (id) => {
            const currentCategory = categories.find(category => category._id === id);
            return currentCategory?.name;
        };

        const existItem = async() => {
            if (id) {
                const item = getMenuItemById(id);
                if ( item ){
                    setName(item.name || "");
                    setCategory(getCategoryName(item.category) || "");
                    setPrice(item.price || "")
                    setDescription(item.description || "");
                    setImageUrl(item.image || "")
                }
            }
        };
        existItem(); 
    
    },[id, getMenuItemById, categories])


    useEffect(() => {
        fetchMenuItems(); 
        fetchCategories();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePriceChange = (value) => {
        const validValue = /^(?!$)(\d{1,10}(\.\d{0,2})?|\.?\d{1,2})$/;
        if (value === "" || validValue.test(value)) {
            setPrice(value);
        }
    };

    const handleSubmit = () => {
    
        
        // add new item if not a existing id
        if (!id) {
            addMenuItem(name, category, price, description, imageUrl);
        } else {
            updateMenuItem(id, name, category, price, description, imageUrl);   
        }
        navigate("/menu");
    };

    const deleteItem = () => {
        deleteMenuItem(id);
        navigate("/menu");
    }

    if (!isAdmin) {
        return null;
    }
    const handleSeleteCategory = (event) => {
        setCategory(event.target.value)
    }

    return (
        <div id="addItem-container">
            <div id="inner-container">
                <form>
                    <section>
                        <label className="input-label"> Name</label>
                        <input className="input-content" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                    </section>
                    <section>
                        <label className="input-label"> 
                            Choose a Category: 
                        </label>
                        <select className="input-content" value={category} onChange={handleSeleteCategory}>
                            <option value="">Select an option</option>
                            <option value="coffee">Coffee</option>
                            <option value="tea">Tea</option>
                            <option value="milkshake">Milkshake</option>
                            <option value="food">Food</option>
                        </select>
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
                        <button className="submit-btn" onClick={handleSubmit}>{id ? "Update Item" : "Add Item"}</button>  
                    </section>
                    {id && 
                        <section>
                            <button className="submit-btn" onClick={deleteItem}>Delete Item</button>
                        </section>
                    }
                </form>
            </div>
        </div>
    );
}