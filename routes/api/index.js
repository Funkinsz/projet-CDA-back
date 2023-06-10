const router = require("express").Router()
const apiUsers = require('./users')
const apiAuth = require('./auth')
const apiAdmin = require('./admin')
const apiAdOrga = require('./adOrga')

router.use("/users", apiUsers)
router.use("/auth", apiAuth)
router.use("/admin", apiAdmin)
router.use("/adOrga", apiAdOrga)

module.exports = router;