import {Request, Response} from "express";
import {createQuiz, searchQuiz, searchQuizzes} from "../queries/quiz";
import {searchAnswers, searchQuestions} from "../queries/question";

export async function ListQuizzes(req: Request, res: Response) {
    const rows = await searchQuizzes();
    res.send({
        result: "success",
        data: rows
    })
}

export async function CreateQuiz(req: Request, res: Response) {
    const id = await createQuiz(req.user?.id, req.body.name);
    res.send({
        result: "success",
        message: {
            id: id
        }
    })
}

export async function QuizData(req: Request, res: Response) {
    const quiz_id = parseInt(req.params["id"])
    const quiz_data = await searchQuiz(quiz_id);
    const questions = await searchQuestions(quiz_id);

    for (const question of questions) {
        question.answers = await searchAnswers(question.question_id);
    }

    quiz_data.questions = questions;

    res.send({
        result: "success",
        data: quiz_data
    })
}
