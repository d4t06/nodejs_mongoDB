const express = require("express");

const newsRouter = require("./news");
const loginRouter = require("./login");
const siteRouter = require("./site");
const productsRouter = require("./products");
const loginController = require("../app/controllers/loginController");

const authMiddleware = require("../app/middlewares/authenticateMiddleware");

const route = function (app) {

   app.get("/logout", loginController.logout);
   
   app.use("/login", authMiddleware.isAuth, loginRouter);

   app.use("/news", authMiddleware.isLoggedin, newsRouter);

   app.use("/products", authMiddleware.isLoggedin, productsRouter);

   app.use("/", authMiddleware.isLoggedin, siteRouter);


};

module.exports = route;
