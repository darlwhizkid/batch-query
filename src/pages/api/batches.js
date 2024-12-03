// src/pages/api/batches.js
import db from '../../db'; // Import your database connection

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const batches = await db.any('SELECT * FROM batches'); // Fetch all batches
            res.status(200).json(batches); // Return the batches as JSON
        } catch (error) {
            console.error('Error fetching batches:', error); // Log the complete error object
            res.status(500).json({ error: 'Database query failed' });
        }
        
    } else if (req.method === 'POST') { // Handle POST requests
        const { id, name, batch_date, batch_image } = req.body; // Extract data from the request body
        try {
            await db.none('INSERT INTO batches (id, name, batch_date, batch_image) VALUES ($1, $2, $3, $4)', [id, name, batch_date, batch_image]);
            res.status(201).json({ message: 'Batch added successfully!' }); // Success response
        } catch (error) {
            console.error('Error adding batch:', error); // Log the error
            res.status(500).json({ error: 'Failed to add batch' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']); // Allow only GET and POST methods
        res.status(405).end(`Method ${req.method} Not Allowed`); // Method not allowed response
    }
}
