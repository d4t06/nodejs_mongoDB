const express = require("express");
const route = require("./routes");
const app = express();
const handlebars = require("express-handlebars");
var methodOverride = require("method-override");
const path = require("path");
const db = require("./config/db")
const port = 3000;


const hbs = handlebars.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: "src/resources/views/layouts",
  partialsDir: "src/resources/views/partials",
});

const viewsPath = path.join(__dirname, "/resources/views");

//static file
app.use(express.static(path.join(__dirname, "public")));

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
