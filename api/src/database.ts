import mysql from "mysql2/promise";

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "quidle",
    connectionLimit: 10
})

export default conn;