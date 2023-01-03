const express = require("express");
const siteController = require("../app/controllers/SitesController");
const couresController = require("../app/controllers/ProductsController");
const router = express.Router();

router.use("/search", siteController.search);
router.use("/", siteController.index);
// router.use("/course:slug"),

module.exports = router;
