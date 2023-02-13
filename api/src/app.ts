import express from 'express';
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

export default server;