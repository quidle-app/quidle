import conn from "../database";
import {ResultSetHeader} from "mysql2";

export async function createQuestion(quiz_id: number, content: string) {
    const res = await conn.query("INSERT INTO questions SET quiz_id = ?, content = ?", [quiz_id, content]);
    return (res[0] as ResultSetHeader).insertId;
}

export async function createAnswer(question_id: number, content: string, correct: boolean) {
    const res = await conn.query("INSERT INTO answers SET question_id = ?, content = ?, correct = ?", [question_id, content, correct]);
    return (res[0] as ResultSetHeader).insertId;
}
