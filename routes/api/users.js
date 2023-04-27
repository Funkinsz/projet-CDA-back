const bcrypt = require("bcrypt")
const connection = require("../../database/index")

const router = require("express").Router()

router.post("/")

// READ USER
router.post("/verifyUser", (req, res) => {
    const email = req.body.email

    const sql = `SELECT email FROM user WHERE email = "${email}"`

    connection.query(sql, (err, result) => {
        console.log(result.length);
        if (err) throw err;
        if (result.length > 0) {
            console.log("Utilisateur déja existant");
            res.send(JSON.stringify("user exist"))   
        } else {
            console.log("user is null");
            res.send(JSON.stringify("User is null"))
        }
    })
})

// INSERT USER PRO
router.post("/addUserPro", async (req, res)  => {
    const surname = req.body.surname
    const name = req.body.name
    const firstname = req.body.firstname
    const email = req.body.email
    const password = req.body.password
    const city = req.body.city
    const adress = req.body.adress
    const date = req.body.date
    const status = req.body.status

    const hashpswd = await bcrypt.hash(password, 8)

    const sql = `INSERT INTO user(surname, name, firstname, email, password, born, user_type, city, adress) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [surname, name, firstname, email, hashpswd, date, status, city, adress]

    connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Utilisateur ajoutée en BDD");
        res.send(JSON.stringify("User is add"))
    })
})

// INSERT USER PERSO
router.post("/addUserPerso", async (req, res)  => {
    const surname = req.body.surname
    const name = req.body.name
    const firstname = req.body.firstname
    const email = req.body.email
    const password = req.body.password
    const city = req.body.city
    const travel = req.body.travel
    const date = req.body.date
    const status = req.body.status

    const hashpswd = await bcrypt.hash(password, 8)

    const sql = `INSERT INTO user(surname, name, firstname, email, password, born, user_type, city, travel_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [surname, name, firstname, email, hashpswd, date, status, city, travel]

    connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Utilisateur ajoutée en BDD");
        res.send(JSON.stringify("User is add"))
    })
})

module.exports = router