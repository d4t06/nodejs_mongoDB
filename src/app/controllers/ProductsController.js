const Product = require("../models/Products");
const Accounts = require("../models/Accounts");
const jwt = require("jsonwebtoken");
const util = require("../../util/mongoose");

class ProductsController {
   index(req, res, next) {
      Promise.all([
         Product.countDeleted(),
         Product.find({}).count(),
         Product.find({}).handlePage(res),
      ])

         .then(([countDeleted, DocCount, products]) => {
            const totalPage = Math.ceil(DocCount / res.locals._page.pageSize);
            // console.log(totalPage);

            res.render("products", {
               countDeleted,
               totalPage,
               products: util.multipleConvert(products),
            });
         })
         .catch((err) => next(err));
   }
   private(req, res, next) {
      try {
         const token = req.params.token;
         const result = jwt.verify(token, "mk");
         console.log(result);
         if (result) {
            next();
         }
      } catch (error) {
         return res.redirect("/login");
      }
   }
   next(req, res, next) {
      res.render("home")
   }

   trash(req, res, next) {
      Promise.all([Product.findDeleted({}).handleSort(req, res)])
         .then(([products]) => {
            res.render("trash", { products: util.multipleConvert(products) });
         })
         .catch((err) => next(err));

      // Product.findDeleted({}).sortable(req)
      //  .then(products => {
      //   res.render("trash", { products: util.multipleConvert(products) })
      //  })
      //  .catch (err => next(err))
   }
   create(req, res) {
      res.render("create");
   }
   store(req, res) {
      const params = req.body;
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
      Product.restore({ _id: req.params.slug }).then(() =>
         res.redirect("back")
      );
   }
   handleFormAction(req, res, next) {
      // res.json(req.body)
      switch (req.body.action) {
         case "DELETE":

         // break;

         case "RESTORE":
            Product.restore({ _id: { $in: req.body.productIds } }).then(() =>
               res.redirect("back")
            );
            break;

         default:
            res.json({ message: "Action invalid!" });
            break;
      }
   }
}

module.exports = new ProductsController();
