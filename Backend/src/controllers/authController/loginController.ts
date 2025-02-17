import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../config/database";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    let connection;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        connection = await pool.getConnection(); 
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        console.log("Database query result:", rows);

        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(401).json({ message: `User ${email} does not exist, Signup to get started.` });
            return;
        }

        const user = rows[0] as { id: number, email: string, name: string, password: string };
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ message: "Invalid Password" });
            return;
        }

        res.status(200).json({ message: "Login successful",  id: user.id, name: user.name });
        return

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    } finally{
        if (connection) connection.release();
    }
};