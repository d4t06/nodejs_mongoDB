// env
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
// database
 require("./config/db")

//port
const port = process.env.PORT || 3000;

const express = require("express");
const route = require("./routes");
const cors = require('cors')
const app = express();
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const passport = require("passport")
const cookieParser = require('cookie-parser');
const session = require("express-session");

// middleWare
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const paginationMiddleware = require("./app/middlewares/paginationMiddleware");

//config handlebars
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: "src/resources/views/layouts",
  partialsDir: "src/resources/views/partials",
  helpers: require('./helper/handlebars')
});

// config path
const viewsPath = path.join(__dirname, "/resources/views");

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

// allow cors
app.use(cors())

//user passport
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for put, delete method
app.use(methodOverride("_method"));

//express handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
