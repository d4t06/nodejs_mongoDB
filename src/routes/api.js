const express = require('express')
const router = express.Router()
const apiController = require("../app/controllers/APIController")

// api/
router.get("/", apiController.getProducts)

router.post("/auth", apiController.login)

router.post("/register", apiController.register)

router.get("/search", apiController.search)
// api/:category/:key
router.get("/:category/:key", apiController.getOne)


module.exports = router
