// const Connection = require("mysql2/typings/mysql/lib/Connection");
const newsRouter = require("./news");
const siteRouter = require("./site");
const productsRouter = require("./products");

const route = function (app) {
  app.use("/news", newsRouter);

  app.use("/products", productsRouter);

  app.get("/", siteRouter);
};

module.exports = route;
