import express, {Request, Response} from 'express';
import cors from 'cors';
import router from './router';
import passport from "passport";
import {session} from "./session";

const server = express();

server.use(cors());
server.use(express.json());

server.use(session)
server.use(passport.initialize());
server.use(passport.session());

server.use("/api", router);

// error handler
server.use((err: Error, req: Request, res: Response, next: Function) => {
    console.log(err)
    if (err) {
        return res.send({
            result: "error",
            message: err.message ?? err
        })
    }
})

export default server;