const connection = require("../../database/index");
const router = require("express").Router();

// READ AD_ORGA
router.get("/readAdOrga", (req, res) => {
  const sql = "SELECT * FROM `ad_pro` INNER JOIN user ON ad_pro.id_user = user.id_user";

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("Récupération des prestation organisateur réussit");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
