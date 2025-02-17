import { Request, Response } from "express";
import { pool } from "../../config/database";

export const getAllQuizzesController = async (req: Request, res: Response) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM quizzes");

        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(404).json({ message: "No quizzes found" });
            return;
        }

        console.log("Quizzes:", rows);
        res.status(200).json(rows);
        return;

    } catch (error) {
        console.error("Error getting quizzes:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    } finally {
        if (connection) connection.release();
    }
}