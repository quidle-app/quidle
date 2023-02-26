import { Router } from 'express';
import Register from "./routes/register";
import Login from "./routes/login";
import Status from "./routes/status";
import {authMiddleware} from "./session";
import {CreateQuiz, ListQuiz, ListQuizzes} from "./routes/quiz";
import asyncHandler from "express-async-handler";
import {NewQuestion} from "./routes/question";

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
authRouter.get("/quiz/:id", asyncHandler(ListQuiz))

authRouter.post("/quiz/:id/question", asyncHandler(NewQuestion))
//authRouter.put("/quiz/:id/question", asyncHandler(EditQuestion))

authRouter.post("/quiz/create", asyncHandler(CreateQuiz))

export default router;
