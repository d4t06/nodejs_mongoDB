// const Connection = require("mysql2/typings/mysql/lib/Connection");
const Product = require("../app/models/Products")
const newsRouter = require("./news");
const siteRouter = require("./site");
const productsRouter = require("./products");

const route = function (app) {
  app.use("/news", newsRouter);

  app.use("/products", productsRouter);

  app.get("/", siteRouter);

  app.get("/test", (req, res) => {
      // res.json(res)
      Product.find({}, (err, products) => {
        if (!err) res.json(products)
      })
  })
};

module.exports = route;
