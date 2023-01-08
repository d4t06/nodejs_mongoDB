const Product = require("../models/Products");
const util = require("../../util/mongoose");

class ProductsController {
  index(req, res, next) {
    // Product.find({}, (err, products) => {
    //   // if (!err) res.json(products)
    // if (!err) res.render("products", { products });
    // else console.log(err);
    // })
    
    Promise.all([Product.countDeleted(), Product.find({})])

      .then(([countDeleted, products]) => {
        res.render("products", {
          countDeleted,
          products: util.multipleConvert(products),
        });
      })
      .catch((err) => next(err));
    // .catch(next)
  }
  trash(req, res, next) {
    let productsQuery = Product.findDeleted({})
 
    // thực hiện sort
    if (req.query.hasOwnProperty("_sort")) {
      productsQuery = productsQuery.sort({
        [res.locals._sort.column] : res.locals._sort.type
      })
      // res.json(res.locals._sort)
    }

    Promise.all([productsQuery])
    .then(([products]) => {
      res.render("trash", { products: util.multipleConvert(products) })
    })
    .catch(err => next(err))


    // Product.findDeleted({})
    // .then((products) => {
    //   res.render("trash", { products: util.multipleConvert(products) });
    //  });
  }
  show(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query("SELECT * from packages WHERE id = ?", [req.params.slug], (err, rows) => {
        connection.release();
        console.log(rows.name);
        // neu khong co loi thi gui du lieu cho client
        if (!err) res.render("products", { rows });
        else console.log(err);
      });
    });
  }
  create(req, res) {
    res.render("create");
  }
  store(req, res) {
    const params = req.body;
    // console.log(params);
    const newProducs = new Product(params);
    newProducs.save(function (err) {
      if (!err) res.redirect("/products");
      else console.log(err);

      // res.json()
    });
  }
  edit(req, res, next) {
    Product.findOne({ _id: req.params.slug })
      .then((product) => {
        res.render("edit", { product: util.convert(product) });
      })
      .catch((err) => next(err));
  }
  update(req, res, next) {
    const params = req.body;
    Product.updateOne({ _id: req.params.slug }, params)
      .then(() => res.redirect("/products"))
      .catch(next);
  }
  search(req, res) {
    const searchTerm = req.body.search;
    Product.find({ name: new RegExp(searchTerm, "i") }).then((products) => {
      res.render("products", { products: util.multipleConvert(products) });
      // res.json(products)
    });
  }
  delete(req, res) {
    // Product.delete(())
    Product.delete({ _id: req.params.slug }).then((product) => {
      res.redirect("/products");
    });
  }
  restore(req, res) {
    Product.restore({ _id: req.params.slug }).then(() => res.redirect("back"));
  }
  handleFormAction(req, res, next) {
    // res.json(req.body)
    switch (req.body.action) {
      case 'DELETE':
        
        // break;

      case 'RESTORE':
        Product.restore({ _id: {$in: req.body.productIds}}).then(() => res.redirect("back"));
        break;
    
      default:
        res.json({message: 'Action invalid!'})
        break;
    }
  }
}

module.exports = new ProductsController();
