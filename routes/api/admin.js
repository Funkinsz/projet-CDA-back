const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
const connection = require("../../database/index");
const { key, keyPub } = require("../../keys");

const fs = require("fs");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = `SELECT * FROM user WHERE email = "${email}" AND user_role = 1`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jsonwebtoken.sign({}, key, {
              subject: user.id_user.toString(),
              expiresIn: 3600 * 24,
              algorithm: "RS256",
            });
            res.cookie("prestaTokenAdmin", token);
            res.send(user);
          } else {
            res.send(JSON.stringify(null));
          }
        } else {
          res.send(JSON.stringify(null));
        }
      } else {
        res.send(JSON.stringify(null));
      }
    });
  } catch (error) {
    res.send(JSON.striongify(null));
  }
});

router.get("/getUsers", (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result))
  })
})

module.exports = router;