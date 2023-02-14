import conn, {query} from "../database";
import {ResultSetHeader} from "mysql2";

type UserQuery = {
    id: number
    hash: string
}

export async function searchUser(user: string) {
    const [rows] = await conn.query("SELECT id, hash FROM users WHERE user = ?", [user]);
    return rows as UserQuery[];
}

export async function createUser(user: string, hash: string) {
    const res = await query("INSERT INTO users SET user = ?, hash = ?", [user, hash]);
    return (res[0] as ResultSetHeader).insertId;
}
