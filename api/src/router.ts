import { Router } from 'express';
import passport from "passport";
import Register from "./routes/register";
import Login from "./routes/login";
import Status from "./routes/status";
import {authMiddleware} from "./session";

// /api/:routes
const router = Router();
const authRouter = Router();

router.post("/auth/login", Login)
router.post("/auth/register", Register)
router.post("/auth/logout", (req, res) => {
    req.session.destroy(() => res.send({message: "success"}))
})

// /api/user/:routes
router.use("/user", authMiddleware, authRouter);

authRouter.get("/status", Status)

export default router;
