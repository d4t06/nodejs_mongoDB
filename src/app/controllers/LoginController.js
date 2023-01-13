const jwt = require("jsonwebtoken");
const Account = require("../models/Accounts");

class LoginController {
   index(req, res) {
      // console.log(req.session.isLoggedin);
      res.render("login");
   }

   login(req, res, next) {
      const username = req.body.username;
      const password = req.body.password;

      Account.findOne({ username: username, password: password })
         .then((user) => {
            if (user) {
               jwt.sign({ id: user._id }, process.env.SESSION_SECRET, (err, token) => {
                  //   res.redirect(`/login/${token}`);
                  res.cookie("token", token);
                  res.redirect("/");
               });
            } else {
               // res.redirect("back");
               const message = 'Tài khoản không tồn tại'
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
      res.clearCookie("token");
      res.redirect("/");
   }
}

module.exports = new LoginController();
