import pool, {transactionQuery} from "../database";
import {ResultSetHeader} from "mysql2";
import {QuestionQuery} from "./question";

type QuizQuery = {
    user_id: number,
    name: string,
    questions: QuestionQuery[] | undefined
}

export async function searchQuiz(quiz_id: number) {
    const res = await pool.query("SELECT * FROM quizzes WHERE quiz_id = ?", [quiz_id]);
    return (res[0] as QuizQuery[])[0] as QuizQuery;
}

export async function searchQuizzes() {
    const [rows] = await pool.query("SELECT * FROM quizzes");
    return rows as QuizQuery[];
} 

export async function createQuiz(user_id: number, name: string) {
    const res = await transactionQuery("INSERT INTO quizzes SET user_id = ?, name = ?", [user_id, name]);
    return (res[0] as ResultSetHeader).insertId;
}
