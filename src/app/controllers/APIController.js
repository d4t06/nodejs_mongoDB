// models
const Product = require("../models/Products");
const Account = require("../models/Accounts");
const Detail = require("../models/Details");

class APIController {
   getProducts(req, res, next) {
      
      const {price, ...query } = req.query;

      console.log("controller pass ", query);
      // console.log(res.locals.sort)

      const [gThan, lThan] = price || [0, 50];

      // console.log(gThan, lThan);

      // service
      Promise.all([
         Product.find({ ...query, cur_price: { $gte: gThan * 1000000, $lte: lThan * 1000000 } }).count(),
         Product.find({ ...query, cur_price: { $gte: gThan, $lte: lThan * 1000000 } }).handlePage(res).handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json({ count, rows });
            return;
         })
         .catch((err) => res.json("loi server"));
   }
   async getOne(req, res, next) {
      // service
      const { key } = req.params;
      console.log(" key = ", key);

      Product.findOne({
         href: key,
         $lookup: {
            from: Detail,
            localField: "key",
            foreignField: "href",
            as: "data",
         },
      })
         .then((data) => {
            res.json(data);
         })
         .catch((error) => {
            console.log(error);
            res.json("loi server");
         });
   }

   search(req, res, next) {
      let { q, page } = req.query;
      if (!page) page = 1
      console.log("search", q, page);

      Promise.all([
         Product.find({ name: new RegExp(q, "i") }).count(),
         Product.find({ name: new RegExp(q, "i") }).limit(page * 8).handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json(rows.length ? { count, rows } : null);
         })
         .catch((err) => {
            res.status(500).json("lối serve")
            console.log(err);
         });
   }
}

module.exports = new APIController();
