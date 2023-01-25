import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor"
})

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("connected do database");
});

export default db;