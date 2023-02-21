const express = require('express')
const router = express.Router()
// controller
const apiController = require("../app/controllers/APIController")
// middleware
// const autheMiddleware = require("../app/middlewares/authenticateMiddleware")
const paginationMiddleware = require("../app/middlewares/paginationMiddleware")


router.get("/", paginationMiddleware, apiController.getProducts)
router.get("/:category/:key", apiController.getOne)
// router.get("/", paginationMiddleware, apiController.getProducts)
// router.get("/:category/:key", apiController.getOne)


module.exports = router
