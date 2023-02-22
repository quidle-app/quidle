import {Request, Response} from "express";
import {createQuiz, searchQuiz, searchQuizzes} from "../queries/quiz";
import {User} from "../session";

export async function ListQuizzes(req: Request, res: Response) {
    let rows = await searchQuizzes();
    res.send({
        result: "success",
        data: rows
    })
}

export async function ListQuiz(req: Request, res: Response) {
    let rows = await searchQuiz(parseInt(req.params["id"]));
    res.send({
        result: "success",
        data: rows
    })
}

export async function CreateQuiz(req: Request, res: Response) {
    let id = await createQuiz((req.user as User).id, req.body.name);
    res.send({
        result: "success",
        message: {
            id: id
        }
    })
}
