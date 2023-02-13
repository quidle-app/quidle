import { Router } from 'express';
import passport from "passport";

const routes = Router();

routes.get("/api/hello", (req, res) => res.send({
    message: "wiadomość z serwera"
}))

routes.post("/api/auth", passport.authenticate("local"))

export default routes;
