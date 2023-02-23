const express = require('express')
const router = express.Router()
const apiController = require("../app/controllers/APIController")
const paginationMiddleware = require("../app/middlewares/paginationMiddleware")

// api/
router.get("/", paginationMiddleware, apiController.getProducts)

router.get("/search", paginationMiddleware, apiController.search)
// api/:category/:key
router.get("/:category/:key", apiController.getOne)


module.exports = router
