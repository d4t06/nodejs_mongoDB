const express = require("express");
const newsController = require("../app/controllers/NewsController");
const router = express.Router();

router.use("/:slug", newsController.show);
router.use("/", newsController.index);

module.exports = router;
