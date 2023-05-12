const bcrypt = require("bcrypt");
const connection = require("../../database/index");

const fs = require("fs");

const router = require("express").Router();

router.post("/");

// READ USER
router.post("/verifyUser", (req, res) => {
  const email = req.body.email;

  console.log(email);

  const sql = `SELECT email FROM user WHERE email = "${email}"`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result[0]);
    if (result[0]) {
      console.log("Utilisateur déja existant");
      res.send(JSON.stringify("user exist"));
    } else {
      console.log("user is null");
      res.send(JSON.stringify("user is null"));
    }
  });
});

// INSERT USER PRO
router.post("/addUserPro", async (req, res) => {
  const surname = req.body.surname;
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const adress = req.body.adress;
  const date = req.body.date;
  const status = req.body.status;
  const image = req.body.image[0].name;

  const hashpswd = await bcrypt.hash(password, 8);

  const sql = `INSERT INTO user(surname, name, firstname, email, password, born, profile_picture, user_type, city, adress) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    surname,
    name,
    firstname,
    email,
    hashpswd,
    date,
    image,
    status,
    city,
    adress,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(image + "test");
    console.log("Utilisateur ajoutée en BDD");
    res.send(JSON.stringify("User is add"));
  });
});

// INSERT USER PERSO
router.post("/addUserPerso", async (req, res) => {
  const surname = req.body.surname;
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const travel = req.body.travel;
  const date = req.body.date;
  const status = req.body.status;
  const image = req.body.image;

  console.log(image);

  const hashpswd = await bcrypt.hash(password, 8);

  const sql = `INSERT INTO 
    user(surname, name, firstname, email, password, born, profile_picture, user_type, city, travel_time) 
    VALUES("${surname}", "${name}", "${firstname}", "${email}", "${hashpswd}", ${date}, "${image}", "${status}", "${city}", "${travel}")`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Utilisateur ajoutée en BDD");
    res.send(JSON.stringify("User is add"));
  });
});

// INSERT IMG

module.exports = router;
