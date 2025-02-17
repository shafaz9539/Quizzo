import mysql from "mysql2/promise"; // Use promise-based MySQL
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on your load
    queueLimit: 0,
});

export const connnectToDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to database");
        connection.release();
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export { pool };
