import { Request, Response } from "express";
import { pool } from "../../config/database";
import { QuizRequestParams, QuizRequestBody } from "../../interfaces/interfaces";

export const updateQuizController = async (req: Request<QuizRequestParams, {}, QuizRequestBody>, res: Response) => {
    let connection;
    try {
        const { id } = req.params;
        const { title, description, teacherId } = req.body;
        if (!id) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }
        if (!title || !description || !teacherId) {
            res.status(400).json({ message: "Title, description and teacherID are required" });
            return;
        }
        
        connection = await pool.getConnection();

        const [rows] = await connection.query("SELECT * FROM quizzes WHERE id = ?", [id]);
        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }

        await connection.query("UPDATE quizzes SET title = ?, description = ?, teacher_id = ? WHERE id = ?", [title, description, teacherId, id]);

        console.log("Quiz updated successfully");
        res.status(200).json({ message: "Quiz updated successfully" });
        return;

    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    } finally {
        if (connection) connection.release();
    }
}