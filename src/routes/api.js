const express = require('express')
const router = express.Router()
const apiController = require("../app/controllers/APIController")
const paginationMiddleware = require("../app/middlewares/paginationMiddleware")
const SortMiddleware = require('../app/middlewares/SortMiddleware')

// api/
router.get("/",SortMiddleware, paginationMiddleware, apiController.getProducts)

router.get("/search", paginationMiddleware, apiController.search)
// api/:category/:key
router.get("/:category/:key", apiController.getOne)


module.exports = router
