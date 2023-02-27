import express, {Request, Response} from "express";
import passport from "passport";
import {User} from "../session";

async function Login(req: Request, res: Response) {
    passport.authenticate("local", (err: any, user: User) => {
        if (!user) {
            err = "invalid credentials";
        }

        if (err) {
            return res.send({
                result: "error",
                message: err
            })
        }

        req.login(user, (err) => {
            if (err) {
                return res.send({
                    result: "error",
                    message: err
                })
            }

            res.send({result: "success"})
        });

    })(req, res);
}

export default Login;
