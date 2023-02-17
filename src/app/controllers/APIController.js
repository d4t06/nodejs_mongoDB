// models
const Product = require("../models/Products");
const Account = require("../models/Accounts");


class APIController {
   getProducts(req, res, next) {

      const query = req.query

      console.log(query)
            
      // service
      Promise.all([Product.find({...query}).count(), Product.find({...query}).handlePage(res)])

         .then(([count, rows]) => {
            res.json({ count, rows });
            return;
         })
         .catch((err) => res.json("loi server"));
   }
   getOne(req, res, next) {
      // service
      const {category, key} = req.params

      console.log(category, key)
      return;

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
