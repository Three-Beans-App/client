import '../styles/pages/AddItemPage.css';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useMenuItemDispatch } from '../contexts/menuItemContext';


export default function AddItemPage() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { addMenuItem } = useMenuItemDispatch();

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);

        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreviewImage(previewUrl);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    const handlePriceChange = (value) => {
        const validValue = /^(?!$)(\d{1,10}(\.\d{0,2})?|\.?\d{1,2})$/;
        if (value === "" || validValue.test(value)) {
            setPrice(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addMenuItem(name, category, price, description, image);
        navigate("/menu");
    };
    // example code comments

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
                        <label className="input-label"> Image </label>
                        <div {...getRootProps({ className: 'dropzone' })} id="imageContainer">
                            <input {...getInputProps()} />
                            <div>
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" />
                                ) : (
                                    <p>Drag image or click to select</p>
                                )}
                            </div>                        
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