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
            fetchBatches();
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
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">ID:</label>
                <input 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    required 
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Batch Date:</label>
                <input 
                    type="date" 
                    value={batchDate} 
                    onChange={(e) => setBatchDate(e.target.value)} 
                    required 
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Batch Image URL:</label>
                <input 
                    type="text" 
                    value={batchImage} 
                    onChange={(e) => setBatchImage(e.target.value)} 
                    required 
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Batch
            </button>
        </form>
    );
};

export default AddBatch;