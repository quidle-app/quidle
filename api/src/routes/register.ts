import {Request, Response} from "express";
import {createUser} from "../queries/user";
import argon from "argon2";

async function Register(req: Request, res: Response) {
    const hash = await argon.hash(req.body.password);
    try {
        await createUser(req.body.login, hash);
        res.send({
            result: "success",
        });
    } catch (err) {
        res.send({
            result: "error",
            message: err.message
        });
    }
}

export default Register;
