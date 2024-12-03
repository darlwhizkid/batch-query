import { useEffect, useState } from 'react';

const Home = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await fetch('/api/batches');
                if (!response.ok) throw new Error('Failed to fetch batches');
                const data = await response.json();
                setBatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Batches</h1>
            <ul>
                {batches.map(batch => (
                    <li key={batch.id}>
                        {batch.name} - {batch.batch_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
