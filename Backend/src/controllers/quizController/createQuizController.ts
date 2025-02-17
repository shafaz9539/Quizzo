import { Request, Response } from "express";
import { pool } from "../../config/database";
import { QuizRequestBody } from "../../interfaces/interfaces";

export const createQuizController = async (req: Request<{}, {}, QuizRequestBody>, res: Response) => {
    let connection;
    try {
        const { title, description, teacherId } = req.body;
        if (!title || !description || !teacherId) {
            res.status(400).json({ message: "Title and description are required" });
            return;
        }

        connection = await pool.getConnection();
        await connection.query("INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)", [title, description, teacherId]);

        console.log("Quiz created successfully");
        res.status(201).json({ message: "Quiz created successfully" });
        return;

    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error" });
        return;

    } finally {
        if (connection) connection.release();
    }
};