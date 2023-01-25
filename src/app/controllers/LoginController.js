const jwt = require("jsonwebtoken");
var passport = require("passport")
const Account = require("../models/Accounts");
var LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(
   function(username, password, done) {
   //   console.log(username, password)
      Account.findOne({username: username, password: password})
      .then(user => {
         // console.log(user)
         // if (!user) return done(null, false);
         return done(null, user)
      })
      .catch(err => {
         done(err)
      })
   }
 ));



class LoginController {
   index(req, res) {
      // console.log(req.session.isLoggedin);
      res.render("login");
   }

   login(req, res, next) {
      const username = req.body.username;
      const password = req.body.password;

      // Account.find({username: username, password: password})
      // .then(user => {
      //    res.json(user)
      // })
      // .catch(err => {
      //    res.status(500)
      // })
      // return

      Account.findOne({ username: username, password: password })
         .then((user) => {
            if (user) {
               // jwt.sign({ id: user._id }, process.env.SESSION_SECRET, (err, token) => {
               //    res.cookie("token", token);
               //    res.redirect("/");
               // });

               // tạo session
               req.session.isLogin = user
               res.redirect("/");
            } else {
               const message = 'Tài khoản hoặc mật khẩu không đúng'
               res.render("login", {message});
            }
         })
         .catch((err) => {
            res.status(500).json(err);
         });
   }
   logout(req, res) {
         req.session.destroy((err) => {
         res.json(err);
      });
      res.redirect("/");
   }
   passport(req, res, next) {
      passport.authenticate("local", function(err, user, info) {
         if (err) return res.json("loi sever");
         if (!user) {
            const message = 'Tài khoản hoặc mật khẩu không đúng'
            return res.render("login", {message});
         };

         // req.user = user
         // res.json(user)
         req.session.isLogin = user
         res.redirect("/");
      })(req, res, next)

      // passport.authenticate("local")(req, res, function(err, user) {
      //    if (err) return res.json("loi sever");
      //    if (!user) return res.json("khong tim thay user")

      //    // req.user = user
      //    res.json(user)
      // })

   }
}

module.exports = new LoginController();
