import { Router } from 'express';
import Register from "./routes/register";
import Login from "./routes/login";
import Status from "./routes/status";
import {authMiddleware} from "./session";
import {CreateQuiz, ListQuizzes} from "./routes/quiz";
import asyncHandler from "express-async-handler";

// /api/:routes
const router = Router();
const authRouter = Router();

router.post("/auth/login", asyncHandler(Login))
router.post("/auth/register", asyncHandler(Register))
router.post("/auth/logout", (req, res) => {
    req.session.destroy(() => res.send({message: "success"}))
})

// /api/user/:routes
router.use("/user", authMiddleware, authRouter);

authRouter.get("/status", Status)

authRouter.get("/quiz/list", asyncHandler(ListQuizzes))
authRouter.post("/quiz/create", asyncHandler(CreateQuiz))

export default router;
