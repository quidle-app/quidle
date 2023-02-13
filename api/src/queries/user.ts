import conn from "../database";

type UserQuery = {
    id: number
    hash: string
}

export async function searchUser(user: string) {
    const [rows] = await conn.query("SELECT id, hash FROM users WHERE user = ?", [user]);
    return rows as UserQuery[];
}

export async function createUser(user: string, hash: string) {
    const local = await conn.getConnection();
    await local.beginTransaction();
    await local.query("INSERT INTO users SET user = ?, hash = ?", [user, hash]);
    await local.commit();
}
