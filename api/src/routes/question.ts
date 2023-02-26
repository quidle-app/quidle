import {Request, Response} from "express";
import {createAnswer, createQuestion} from "../queries/question";
import {closeConn, getConn} from "../database";

export async function NewQuestion(req: Request, res: Response) {
    const quiz_id = req.body.quiz_id;
    const content = req.body.content;
    const answers = req.body.answers ?? [];

    const conn = await getConn();

    const question_id = await createQuestion(conn, quiz_id, content);

    for (const answer of answers) {
        if (answer.content.length == 0) {
            continue;
        }
        await createAnswer(conn, question_id, answer.content, answer.correct);
    }

    await closeConn(conn);

    res.send({
        result: "success"
    });
}
