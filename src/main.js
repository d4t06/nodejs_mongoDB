const express = require("express");
const route = require("./routes");
const app = express();
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require("express-session");
// const dotenv = require('dotenv')
const db = require("./config/db")
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const paginationMiddleware = require("./app/middlewares/paginationMiddleware");

const port = 3000;


const hbs = handlebars.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: "src/resources/views/layouts",
  partialsDir: "src/resources/views/partials",
  helpers: require('./helper/handlebars')
});

const viewsPath = path.join(__dirname, "/resources/views");
require('dotenv').config()
// use sessions
app.use(session({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: false
}))
// use custom middleware
app.use(SortMiddleware)
app.use(paginationMiddleware)

//static file
app.use(express.static(path.join(__dirname, "public")));
// use cookies parser
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for put, delete method
app.use(methodOverride("_method"));

//express handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", viewsPath);

//connect db
db.connect();

//Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
