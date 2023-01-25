import { Router } from 'express';

const routes = Router();

routes.get("/api/hello", (req, res) => res.send({
    message: "wiadomość z serwera"
}))

export default routes;