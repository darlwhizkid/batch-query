// src/pages/batches.js
import { useEffect, useState } from 'react';
import AddBatch from '../AddBatch';

const BatchesPage = () => {
    const [batches, setBatches] = useState([]);

    const fetchBatches = async () => {
        const response = await fetch('/api/batches');
        const data = await response.json();
        setBatches(data);
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Batches</h1>
            <AddBatch fetchBatches={fetchBatches} />
            <h2 className="text-2xl font-semibold mt-8 mb-4">Current Batches</h2>
            <ul className="grid gap-4">
                {batches.map(batch => (
                    <li key={batch.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <img src={batch.batch_image} alt={batch.name} className="w-24 h-24 object-cover rounded" />
                            <div>
                                <h3 className="font-semibold">{batch.name}</h3>
                                <p className="text-gray-600">{batch.batch_date}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BatchesPage;
