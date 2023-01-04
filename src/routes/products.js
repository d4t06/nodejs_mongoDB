const express = require("express");
const productsController = require("../app/controllers/ProductsController");
const route = express.Router();

route.get("/create", productsController.create);
route.get("/trash", productsController.trash);
route.post("/store", productsController.store);
route.post("/find", productsController.search);
route.put("/update/:slug", productsController.update);
route.get("/delete/:slug", productsController.delete);
route.get("/:slug/edit", productsController.edit);
route.get("/:slug", productsController.show);
route.get("/", productsController.index);

module.exports = route;
