// src/components/AddBatch.js
import { useState } from 'react';

const AddBatch = ({ fetchBatches }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [batchImage, setBatchImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/batches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, batch_date: batchDate, batch_image: batchImage }),
        });

        if (response.ok) {
            alert('Batch added successfully!');
            fetchBatches(); // Fetch updated batches
            setId('');
            setName('');
            setBatchDate('');
            setBatchImage('');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Batch Date:</label>
                <input type="date" value={batchDate} onChange={(e) => setBatchDate(e.target.value)} required />
            </div>
            <div>
                <label>Batch Image URL:</label>
                <input type="text" value={batchImage} onChange={(e) => setBatchImage(e.target.value)} required />
            </div>
            <button type="submit">Add Batch</button>
        </form>
    );
};

export default AddBatch;
