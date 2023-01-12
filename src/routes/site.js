const express = require("express");
const siteController = require("../app/controllers/SitesController");
const couresController = require("../app/controllers/ProductsController");
const router = express.Router();

router.get("/search", siteController.search);
router.get("/login", siteController.login)
router.post("/login", siteController.handleLogin)
router.get("/", siteController.index);
// router.use("/course:slug"),

module.exports = router;
