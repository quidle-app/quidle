import express from 'express';
import cors from 'cors';
import routes from './routes';
import passport from "passport";
import {session, createStrategy, serializeUser, deserializeUser} from "./session";

const server = express();

server.use(cors());
server.use(express.json());

server.use(session)
server.use(passport.initialize());
server.use(passport.session());

server.use(routes);

passport.use(createStrategy());
passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

export default server;