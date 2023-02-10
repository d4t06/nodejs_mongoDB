const express = require('express')
const router = express.Router()
// controller
const apiController = require("../app/controllers/APIController")
// middleware
const autheMiddleware = require("../app/middlewares/authenticateMiddleware")


router.get("/:category", apiController.index)
router.get("/:category/:key", apiController.getOne)


module.exports = router
