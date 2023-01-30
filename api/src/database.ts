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

    /*
     * Semicolons are for the weak
     * True chads don't use semicolons
     *
     * You don't use semicolons for readability
     * I don't use semicolons because they annoy me
     * we are not the same
     *
     * Terrible variable naming starts below
     * Feeling cute might refactor later
     *
     * criticism over cretinous features and writing that may or may not appear below are welcome
     */

    // add an if statement below to check whether quidle database exists
if (db.state === 'disconnected')
    console.log("Database error; connection failure.")
else
    db.query("USE quidle;", (err) => {
        if (err)
            throw err
        console.log("now using quidle db")
    })


function select(
    cols = ['*'],
    tbl: string,
    lmt = 25,
    whr = ['1'],
    asc = true,
    grp: string[] = null,
    hvg: string[] = null,
    ord: string[] = null) {

    if (db.state === 'disconnected') {
        console.log("Database error; connection failure.")
        return
    }

    let columns = ''
    let where = ''
    let group = ''
    let having = ''
    let order = ''
    let sc = ''
    /*
     * format every part of query
     * ignore everything after semicolons within a single string
     * maybe remove commas? To implement later
     */
    // columns
    for (let c in cols) {
        let temp = cols[c].trim()
        let column = temp.split(';')
        columns += column[0]
        if (parseInt(c) != cols.length-1)
            columns += ', '
    }
    // where statements
    for (let w in whr)
    {
        let temp = whr[w].trim()
        let wh = temp.split(';')
        where += wh[0]
        if (parseInt(w) < whr.length-1)
            where += ', '
    }
    // grouping statements
    if (grp != null && grp.length > 0)
    {
        group = "GROUP BY "
        for (let g in grp)
        {
            let temp = grp[g].trim()
            let gb = temp.split(';')
            group += gb[0]
            if (parseInt(g) < grp.length-1)
                group += ', '
        }
    }
    // having statements
    if (hvg != null && hvg.length > 0)
    {
        having = "HAVING "
        for (let h in hvg)
        {
            let temp = hvg[h].trim()
            let gb = temp.split(';')
            having += gb[0]
            if (parseInt(h) < hvg.length-1)
                having += ', '
        }
    }
    // order statements
    if (ord != null && ord.length > 0)
    {
        order = "ORDER BY "
        for (let o in ord)
        {
            let temp = ord[o].trim()
            let gb = temp.split(';')
            order += gb[0]
            if (parseInt(o) < ord.length-1)
                having += ', '
        }
        if (asc)
            sc = "ASC"
        else
            sc = "DESC"
    }

    let query = `SELECT ${columns} FROM ${tbl} WHERE ${where} ${group} ${having} ${order} ${sc} LIMIT ${lmt};`
    // db.query("START TRANSACTION")
    db.query(query, (err, result) => {
        if (err)
            throw err
        return result
    })
}

function commit()
{
    db.query("COMMIT;")
}

function rollback()
{
    db.query("ROLLBACK;")
}

export default db;