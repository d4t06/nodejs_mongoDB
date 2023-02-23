// models
const Product = require("../models/Products");
const Account = require("../models/Accounts");
const Detail = require("../models/Details")


class APIController {
   getProducts(req, res, next) {

      const {price, ...querys} = req.query

      console.log(querys)
      
      const [gThan, lThan] = price || [0, 50]

      console.log(gThan, lThan)
            
      // service
      Promise.all([
         Product.find({...querys, cur_price: { $gte: gThan  * 1000000, $lte: lThan * 1000000}}).count(), 
         Product.find({...querys, cur_price: { $gte: gThan, $lte: lThan * 1000000}}).handlePage(res)])

         .then(([count, rows]) => {
            res.json({ count, rows });
            return;
         })
         .catch((err) => res.json("loi server"));
   }
   async getOne(req, res, next) {
      // service
      const {key} = req.params
      console.log(key)

      Product.findOne({
         href: key,
         $lookup:
         {
            from: Detail,
            localField: "key",
            foreignField: "href",
            as: 'data'
         }
      })
      .then(data => {
         res.json(data)
      })
      .catch(error => {
         console.log(error);
         res.json("loi server");
      })
   }
   search(req, res, next) {
      const {q} = req.query;

      // console.log("/" + q + "/" + "i")
      
      // service
      Product.find({ name: new RegExp(q, "i") }).limit(6)
         .then((products) => {
               res.json(products.length ? products : null)
         })
         .catch((err) => res.status(500).json("lối serve"));
   }
}

module.exports = new APIController();
