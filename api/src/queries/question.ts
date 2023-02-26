import {ResultSetHeader} from "mysql2";
import {Connection} from "mysql2/promise";
import {queryOrDestroy} from "../database";

export async function createQuestion(conn: Connection, quiz_id: number, content: string) {
    const res = await queryOrDestroy(conn, "INSERT INTO questions SET quiz_id = ?, content = ?", [quiz_id, content]);
    return (res[0] as ResultSetHeader).insertId;
}

export async function createAnswer(conn: Connection, question_id: number, content: string, correct: boolean) {
    const res = await queryOrDestroy(conn, "INSERT INTO answers SET question_id = ?, content = ?, correct = ?", [question_id, content, correct]);
    return (res[0] as ResultSetHeader).insertId;
}
