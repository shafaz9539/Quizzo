import { Router } from "express";
import { loginController } from "../controllers/authController/loginController";
import { signupController } from "../controllers/authController/signupCOntroller";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);

export default router;