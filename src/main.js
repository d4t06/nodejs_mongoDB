const express = require("express");
const route = require("./routes");
const app = express();
const handlebars = require("express-handlebars");
var methodOverride = require("method-override");
const path = require("path");
const db = require("./config/db")
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const port = 3000;


const hbs = handlebars.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: "src/resources/views/layouts",
  partialsDir: "src/resources/views/partials",
  helpers: {
    moneyFormat: (string) => {
      const formater = new Intl.NumberFormat('en-US', 
        { style: 'currency', currency: 'VND'}
      )
      return formater.format(string);
    },
    sort: (local_sort) => { 
      console.log(local_sort)
;
      const icons = {
        asc: 'arrow-down',
        desc: 'arrow-up',
      }
      const types = {
        desc: 'asc',
        asc: 'desc'
      }

      const icon = icons[local_sort.type]
      const type = types[local_sort.type]




      // switch (local_sort.style) {
      //   case 'asc':
      //     iconName = ascending;
      //     break;
      //   case 'desc':
      //     iconName = descending;
      //     break;      
      //   default:
      //     iconName = noSort;
      //     break;
      // }
      return `<a href="?_sort&column=name&type=${type}">
      <ion-icon name="${icon}-outline"></ion-icon>
      </a>`

    }
  }
});

const viewsPath = path.join(__dirname, "/resources/views");

// use custom middleware

app.use(SortMiddleware)

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
