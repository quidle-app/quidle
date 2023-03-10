import {Request, Response} from "express";
import {createUser} from "../queries/user";
import argon from "argon2";

async function Register(req: Request, res: Response) {
    const hash = await argon.hash(req.body.password);
    let id = await createUser(req.body.login, hash);

    const user = {
        id: id,
        username: req.body.login
    };

    req.login(user, () => res.send({
        result: "success"
    }));
}

export default Register;
