const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "presta"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("connection à la BDD réussit");
})

module.exports = connection