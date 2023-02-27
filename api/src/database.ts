import mysql, {Connection} from "mysql2/promise";

const host = (process.env.NODE_ENV === "production") ? "database" : "localhost";

const pool = mysql.createPool({
    host: host,
    user: "root",
    password: "toor",
    database: "quidle",
    connectionLimit: 10
});

// returns connection from the pool with started transaction
export async function getConn() {
    return (await pool.getConnection()) as Connection;
}

export async function closeConn(conn: Connection) {
    await conn.commit();
    await conn.destroy();
}

export async function transactionQuery(sql: string, values: any) {
    const conn = await pool.getConnection();
    let res;
    try {
        conn.beginTransaction();
        res = await conn.query(sql, values);
        await conn.commit();
        conn.destroy();
        return res;
    } catch (e) {
        await conn.rollback();
        await conn.destroy();
        throw e;
    }
}

export async function queryOrDestroy(conn: Connection, sql: string, values: any) {
    try {
        return await conn.query(sql, values);
    } catch (err) {
        await conn.rollback();
        conn.destroy();
        throw err;
    }
}

export default pool;