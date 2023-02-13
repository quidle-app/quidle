import {Request, Response} from "express";
import {User} from "../session";

async function Login(req: Request, res: Response) {
    let user = (req.user as User).username;
    res.send({
        result: "success",
        message: `Hello, ${user}`
    });
}

export default Login;
