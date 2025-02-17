import { Request, Response } from "express";
import { pool } from "../../config/database";
import { QuizRequestParams } from "../../interfaces/interfaces";


export const getQuizByIdController = async (req: Request<QuizRequestParams>, res: Response) => {
    let connection;
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM quizzes WHERE id = ?", [id]);

        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }

        console.log("Quiz:", rows[0]);
        res.status(200).json(rows[0]);
        return;

    } catch (error) {
        console.error("Error getting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    } finally {
        if (connection) connection.release();
    }
}