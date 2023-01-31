// models
const Product = require("../models/Products");
const Account = require("../models/Accounts");


class APIController {
   index(req, res, next) {
      // serives
      Promise.all([Product.find({}).count(), Product.find({}).handlePage(res)])

         .then(([DocCount, products]) => {
            const totalPage = Math.ceil(DocCount / res.locals._page.pageSize);
            // res.json({products: util.multipleConvert(products)})
            res.json({ products, totalPage });
            return;
         })
         .catch((err) => next(err));
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
