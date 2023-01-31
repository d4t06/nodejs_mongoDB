// model
const Account = require("../app/models/Accounts")
//router
const apiRouter = require("./api")
const authRouter = require("./auth")
const newsRouter = require("./news");
const regiserRouter = require("./register")
const loginRouter = require("./login");
const siteRouter = require("./site");
// controller
const productsRouter = require("./products");
const loginController = require("../app/controllers/LoginController");
//middleWare
const authMiddleware = require("../app/middlewares/authenticateMiddleware");

const route = function (app) {
   // test
   app.use("/api", apiRouter)

   app.get("/users", (req, res) => {
      Account.find({})
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
   })
   
   app.get("/logout",authMiddleware.logoutHandle, loginController.logout);

   app.use("/register",authMiddleware.loginHandle, regiserRouter)
   
   app.use("/login" ,authMiddleware.loginHandle, loginRouter);

   app.use("/auth", authRouter)

   app.use("/news", authMiddleware.isLogined, newsRouter);

   app.use("/products",authMiddleware.isLogined, productsRouter);

   app.use("/",authMiddleware.isLogined, siteRouter);


};

module.exports = route;
