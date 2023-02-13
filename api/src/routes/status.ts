import {Request, Response} from "express";
import {User} from "../session";

async function Status(req: Request, res: Response) {
    let user = (req.user as User);
    res.send({
        result: "success",
        message: "you are logged in",
        username: user.username,
        userId: user.id
    });
}

export default Status;
