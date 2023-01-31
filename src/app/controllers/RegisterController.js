const jwt = require("jsonwebtoken");
var passport = require("passport");
const Account = require("../models/Accounts");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

class RegisterController {
   index(req, res) {
      // console.log(req.session.isLoggedin);
      res.render("register");
   }

   handleRegister(req, res, next) {
      const username = req.body.username;
      const password = req.body.password;

      // Promise.all([
      //    Account.findOne({ username: username, password: password }),

      // ])

      // đây là một service
      Account.findOne({ username: username })
         .then((user) => {
            if (user) {
               const message = "Username của bạn đăng ký đã tồn tại";
               res.render("register", { message });
            } else {
               // req.body = {username, password}
               next();
            }
         })
         .catch((err) => {
            res.status(500).json("lỗi server khi đăng ký");
         });
   }
   Register(req, res, next) {
      const { username, password } = req.body;
      bcrypt
         .genSalt(10)
         .then(result => {
            // console.log(result)
            // res.json(err)
            // return
            bcrypt.hash(password, result)
            .then(result);
            // if (err) res.json("gen Hash Error");
            // return result            
            res.json(hash)
         // .then((hash) => res.json(hash));
         })
         .catch((err) => res.json("lỗi khi gen hash"));
      return;

      const newAccount = new Account({ username: username, password: password });

      newAccount
         .save()
         .then((account) =>
            // res.json(account)
            res.redirect("/login")
         )
         .catch((error) => {
            res.json(500).json(error);
         });

      // try {
      //    res.redirect("/login")
      // } catch (error) {
      //    res.json(500).json(error)
      // }
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
}

module.exports = new RegisterController();
