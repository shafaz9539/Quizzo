import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../config/database";

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

export const signupController = async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    let connection;
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, Email, and Password are required" });
            return;
        }

        connection = await pool.getConnection();

        const [existingUser]: any = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            res.status(409).json({ message: `User ${email} already exists, Login to continue.` });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        const [result]: any = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = result[0] as { id: number, name: string, email: string };

        res.status(201).json({ message: `User ${email} registered successfully`, user});
        return;

    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    } finally {
        if (connection) connection.release();
    }
};
