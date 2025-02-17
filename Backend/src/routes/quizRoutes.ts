import { Router } from "express";

import { createQuizController } from "../controllers/quizController/createQuizController";
import { getAllQuizzesController } from "../controllers/quizController/getAllQuizzesController";
import { getQuizByIdController } from "../controllers/quizController/getQuizByIdController";
import { updateQuizController } from "../controllers/quizController/updateQuizController";
import { deleteQuizController } from "../controllers/quizController/deleteQuizController";
import { getQuizByTeacherIdController } from "../controllers/quizController/getQuizByTeacherIdController";


const router = Router();

router.post("/quizzes", createQuizController);
router.get("/quizzes", getAllQuizzesController);
router.get("/quizzes/:id", getQuizByIdController);
router.get("/quizzes/teacherID/:teacherId", getQuizByTeacherIdController);
router.put("/quizzes/:id", updateQuizController);
router.delete("/quizzes/:id", deleteQuizController);

export default router;