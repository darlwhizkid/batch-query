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
        fetchBatches(); // Fetch batches on component mount
    }, []);

    return (
        <div>
            <h1>Batches</h1>
            <AddBatch fetchBatches={fetchBatches} /> {/* Pass fetch function to AddBatch */}
            <h2>Current Batches</h2>
            <ul>
                {batches.map(batch => (
                    <li key={batch.id}>
                        {batch.name} - {batch.batch_date} - <img src={batch.batch_image} alt={batch.name} width="100" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BatchesPage;
