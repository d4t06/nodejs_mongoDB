// models
const Product = require("../models/Products");
const Account = require("../models/Accounts");
const Detail = require("../models/Details")


class APIController {
   getProducts(req, res, next) {

      const querys = req.query

      console.log(querys)
            
      // service
      Promise.all([Product.find({...querys}).count(), Product.find({...querys}).handlePage(res)])

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
   login(req, res, next) {
      const username = req.body.username;
      const password = req.body.password;
      
      // service
      Account.findOne({ username: username, password: password })
         .then((account) => {
            console.log(account)
            // res.json("Tìm tháy tài khoản, tiến hành đăng nhập")
            if (account) {
               req.session.isLogin = account;
               res.redirect("http://localhost:3001/products");
            }
            else {
               res.json('mat khau hoac tai khoan khong dung')
            }
         })
         .catch((err) => res.status(500).json("lối serve"));
   }
}

module.exports = new APIController();
