const router = require("express").Router()
const apiUsers = require('./users')
const apiAuth = require('./auth')
const apiAdOrga = require('./adOrga')

router.use("/users", apiUsers)
router.use("/auth", apiAuth)
router.use("/adOrga", apiAdOrga)

module.exports = router;