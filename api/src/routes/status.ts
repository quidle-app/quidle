import {Request, Response} from "express";

async function Status(req: Request, res: Response) {
    res.send({
        result: "success",
        message: "you are logged in",
        username: req.user.username,
        user_id: req.user.id
    });
}

export default Status;
