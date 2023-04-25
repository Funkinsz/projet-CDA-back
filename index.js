const bodyParser = require("body-parser")
const express = require("express")
const mysql = require("mysql")

const app = express()
const http = require("http")
const server = http.createServer(app)

const cors = require("cors")
const port = 8000

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "presta"
})

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

// USER
// INSERT USER
app.post("/addUser", (req, res)  => {
    const surname = req.body.surname
    const name = req.body.name
    const firstname = req.body.firstname
    const email = req.body.email
    const password = req.body.password
    const city = req.body.city
    const travel = req.body.travel
    const date = req.body.date
    const status = req.body.status

    const sql = `INSERT INTO user(surname, name, firstname, email, password, born, user_type, city, travel_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [surname, name, firstname, email, password, city, travel,date, status]

    connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Utilisateur ajoutée en BDD");
    })
})

app.listen(port, () => {
    console.log(`Serveur NodeJS écoutant sur le port ${port}`);
})