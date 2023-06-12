const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
const connection = require("../../database/index");
const { key, keyPub } = require("../../keys");

const fs = require("fs");

// AUTH
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

router.get('/current', async (req, res) =>{
  const { prestaTokenAdmin } = req.cookies

  if (prestaTokenAdmin) {
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
})

// USERS
router.get("/getUsers", (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.post("/updateUser", (req, res) => {
  const { id_user, surname, email, name, firstname, type } = req.body;

  console.log({ id_user, surname, email, name, firstname, type });

  const sql = `UPDATE user SET surname = ?, email = ?, name = ?, firstname = ?, user_type = ? WHERE id_user = ?`;
  const values = [surname, email, name, firstname, type, id_user];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("User Updated");
    res.send(JSON.stringify(result));
  });
});

router.get("/banUser", (req, res) => {
  const id = req.query.id
  const role = req.query.role
  console.log(role);

  let newRole
  if (role >= 0) {
    newRole = -1
  } else {
    newRole = 0
  }

  console.log(newRole);

  const sql = `UPDATE user SET user_role = ? WHERE id_user = ?`
  const value = [newRole, id]

  connection.query(sql, value, (err, result) => {
    if (err) throw err;
    console.log("User Banned");
    res.send(JSON.stringify(result))
  })
})

// ADDS
router.get("/getAdds", (req, res) => {
  connection.query("SELECT * FROM ad_pro", (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result))
  })
})
module.exports = router;
