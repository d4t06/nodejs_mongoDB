const pool = require("../../config/db");
const Product = require("../models/Products")
const util = require("../../util/mongoose");
const { param } = require("express/lib/request");

class ProductsController {
  index(req, res, next) {
    // Product.find({}, (err, products) => {
    //   // if (!err) res.json(products)
    // if (!err) res.render("products", { products });
    // else console.log(err);
    // })
    Product.find({})
      .then(products => 
        {
          res.render("products", { products:  util.multipleConvert(products) })
        }
      )
        
      .catch(err => next(err))
  }
  show(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query(
        "SELECT * from packages WHERE id = ?",
        [req.params.slug],
        (err, rows) => {
          connection.release();
          console.log(rows.name);
          // neu khong co loi thi gui du lieu cho client
          if (!err) res.render("products", { rows });
          else console.log(err);
        }
      );
    });
  }
  create(req, res) {
    res.render("create");
  }
  store(req, res) {
    const params = req.body
    console.log(params)
    const newProducs = new Product (params)
    newProducs.save(function (err) {
            if (!err) res.redirect("/products");
      else console.log(err);

      // res.json()
    })
  }
  edit(req, res, next) {
    Product.findOne({_id: req.params.slug})
    .then((product) => {
      res.render("edit", {product: util.convert(product)})
    } )
    .catch(err => next(err))
  }
  update(req, res, next) {

    const params = req.body
    Product.updateOne({_id : req.params.slug, }, params)
      .then (() => res.redirect("/products"))
      .catch(next)
  }
  find(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const searchTerm = req.body.search;
      connection.query(
        "SELECT * from packages WHERE name LIKE ?",
        ["%" + searchTerm + "%"],
        (err, rows) => {
          connection.release();

          // neu khong co loi thi gui du lieu cho client
          if (!err) {
            // res.redirect("/products");
            // console.log(rows);
            res.render("products", { rows });
          } else console.log(err);
        }
      );
    });
  }
  delete(req, res) {

   Product.deleteOne({_id: req.params.slug})
    .then(() => res.redirect("/products"))

  }
}

module.exports = new ProductsController();
