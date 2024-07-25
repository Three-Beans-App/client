import '../styles/pages/AddItemPage.css';
import React, { useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useMenuItemDispatch } from '../contexts/menuItemContext';


export default function AddItemPage() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { addMenuItem } = useMenuItemDispatch();

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addMenuItem(name, category, price, description, image);
        navigate("/menu");
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
                Category:
                <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} required />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
            </label>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select an image</p>
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
}