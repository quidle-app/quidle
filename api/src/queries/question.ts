import {ResultSetHeader} from "mysql2";
import {Connection} from "mysql2/promise";
import pool, {queryOrDestroy} from "../database";

type AnswerQuery = {
    answer_id: number,
    answer: string
}

export type QuestionQuery = {
    question_id: number,
    content: string,
    answers: AnswerQuery[]
}

export async function createQuestion(conn: Connection, quiz_id: number, content: string) {
    const res = await queryOrDestroy(conn, "INSERT INTO questions SET quiz_id = ?, content = ?", [quiz_id, content]);
    return (res[0] as ResultSetHeader).insertId;
}

export async function createAnswer(conn: Connection, question_id: number, answer: string, correct: boolean) {
    const res = await queryOrDestroy(conn, "INSERT INTO answers SET question_id = ?, answer = ?, correct = ?", [question_id, answer, correct]);
    return (res[0] as ResultSetHeader).insertId;
}

export async function searchQuestions(quiz_id: number) {
    const [res] = await pool.query("SELECT question_id, content FROM questions WHERE quiz_id = ?", [quiz_id]);
    return res as QuestionQuery[];
}

export async function searchAnswers(question_id: number) {
    const [res] = await pool.query("SELECT answer_id, answer, correct FROM answers WHERE question_id = ?;", [question_id]);
    return res as AnswerQuery[];
}
