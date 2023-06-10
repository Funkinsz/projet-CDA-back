const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
const connection = require("../../database/index");
const { key, keyPub } = require("../../keys");

const fs = require("fs");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = `SELECT * FROM user WHERE email = "${email}"`;
    connection.query(sql, (err, result) => {
      console.log(result.length);
      if (err) throw err;
      if (result.length > 0) {
        console.log("connection ok");
        const user = result[0];

        console.log("user : " + user.user_role);
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jsonwebtoken.sign({}, key, {
              subject: user.id_user.toString(),
              expiresIn: 3600 * 24 * 30 * 6,
              algorithm: "RS256",
            });
            res.cookie("prestaToken", token);
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
    res.send(JSON.stringify(null));
  }
});

router.get("/current", async (req, res) => {
  const { prestaToken } = req.cookies;
  const { prestaTokenAdmin } = req.cookies;
  if (prestaToken) {
    try {
      const decodedToken = jsonwebtoken.verify(prestaToken, keyPub);
      console.log({ decodedToken });
      const sql = `SELECT id_user, surname, name, firstname, email, born, profile_picture, banner_user, singer, city, travel_time, adress, desc_user, siret, user_role FROM user WHERE id_user = ${decodedToken.sub}`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        const currentUser = result[0];
        if (currentUser) {
          res.send(currentUser);
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else if (prestaTokenAdmin) {
    try {
      const decodedToken = jsonwebtoken.verify(prestaTokenAdmin, keyPub);
      console.log({ decodedToken });
      const sql = `SELECT id_user, surname, name, firstname, email, born, profile_picture, banner_user, singer, city, travel_time, adress, desc_user, siret, user_role FROM user WHERE id_user = ${decodedToken.sub}`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        const currentUser = result[0];
        if (currentUser) {
          res.send(currentUser);
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else {
    res.send(JSON.stringify(null));
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("prestaToken");
  res.end();
});

router.delete("/admin", (req, res) => {
  res.clearCookie("prestaTokenAdmin");
  res.end();
});

module.exports = router;