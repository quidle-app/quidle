import {Request, Response} from "express";
import passport from "passport";

async function Login(req: Request, res: Response) {
    passport.authenticate("local", (err, user) => {
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
