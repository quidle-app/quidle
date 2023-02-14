import mysql from "mysql2/promise";

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "quidle",
    connectionLimit: 10
})

export async function query(sql: string, values: any) {
    const local = await conn.getConnection();
    let res;
    try {
        res = await local.query(sql, values);
        local.destroy()
        return res;
    } catch (e) {
        local.destroy()
        throw e;
    }
}

export default conn;