import pool, {transactionQuery} from "../database";
import {ResultSetHeader} from "mysql2";

type UserQuery = {
    id: number,
    hash: string
}

export async function searchUser(user: string) {
    const [rows] = await pool.query("SELECT id, hash FROM users WHERE user = ?", [user]);
    return rows as UserQuery[];
}

export async function createUser(user: string, hash: string) {
    const res = await transactionQuery("INSERT INTO users SET user = ?, hash = ?", [user, hash]);
    return (res[0] as ResultSetHeader).insertId;
}
