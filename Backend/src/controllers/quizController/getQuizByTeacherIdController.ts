import { Request, Response } from "express";
import { pool } from "../../config/database";
import { QuizRequestParams } from "../../interfaces/interfaces";


export const getQuizByTeacherIdController = async (req: Request<QuizRequestParams>, res: Response) => {
    let connection;
    try {
        const { teacherId } = req.params;
        if (!teacherId) {
            res.status(400).json({ message: "Teacher ID is required" });
            return;
        }

        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM quizzes WHERE teacher_id = ?", [teacherId]);

        console.log("Quiz:", rows);
        res.status(200).json(rows);
        return;

    } catch (error) {
        console.error("Error getting quiz:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    } finally {
        if (connection) connection.release();
    }
}