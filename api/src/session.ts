import Session from "express-session";
import argon from "argon2";
import {Strategy, VerifyFunction} from "passport-local";
import {searchUser} from "./queries/user";
import passport from "passport";
import {Request, Response} from "express";

export const session = Session({
    secret: "secret",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
});

export type User = {
    username: string,
    id: number
}

const password_verify: VerifyFunction = async (user, password, done) => {
    let rows = await searchUser(user);
    if (rows.length != 1 || !await argon.verify(rows[0].hash, password)) {
        return done(null, false, {message: "incorrect username or password"});
    }
    return done(null, {
        username: user,
        id: rows[0].id,
    });
}

passport.use(new Strategy({
    usernameField: "login",
    passwordField: "password"
}, password_verify));

passport.serializeUser((user: User, done) => {
    done(null, {
        id: user.id,
        username: user.username
    });
});

passport.deserializeUser((user: User, done) => {
    done(null, user);
});

export function authMiddleware(req: Request, res: Response, next: () => void) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.send({
            result: "error",
            message: "unauthorized"
        });
    }
}