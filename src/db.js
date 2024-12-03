// src/db.js
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'localhost',         // Your database host
    port: 5432,               // Default PostgreSQL port
    database: 'Training_center', // Replace with your database name
    user: 'postgres',     // Replace with your database username
    password: 'postgres',  // Replace with your database password
});

export default db;
