import Session from "express-session";
import conn from "./database";
import argon from "argon2";
import {Strategy} from "passport-local";

export const session = Session({
    secret: "query",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
});

async function password_verify(user: string, password: string, cb: any) {
    let [rows] = await conn.query("SELECT hash FROM users WHERE user = ?", [user]);
    // @ts-ignore
    if (rows.length != 1 || !await argon.verify(rows[0].hash, password)) {
        return cb(null, false, {message: "incorrect username or password"});
    }
    cb(null, user);
}

export function createStrategy() {
    return new Strategy({
        usernameField: "login",
        passwordField: "password"
    }, (user: string, password: string, cb: any) => {
        password_verify(user, password, cb).then()
    })
}

export function serializeUser(user: string, done: any) {
    done(null, user);
}

export function deserializeUser(user: string, done: any) {
    done(null, user);
}
