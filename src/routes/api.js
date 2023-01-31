const express = require('express')
const router = express.Router()
// controller
const apiController = require("../app/controllers/APIController")
// middleware
const autheMiddleware = require("../app/middlewares/authenticateMiddleware")


router.get("/products", apiController.index)
router.post("/login", apiController.login)


module.exports = router
