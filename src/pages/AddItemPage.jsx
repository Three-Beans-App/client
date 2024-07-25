import '../styles/pages/AddItemPage.css';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';


export default function AddItem() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const history = useHistory();

    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('filename', name);

            await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
        }

        const response = await fetch('api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, category, price, description })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            history.push('/menu');
        }
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