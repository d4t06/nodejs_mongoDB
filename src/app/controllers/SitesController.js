const Account = require("../models/Accounts");
const util = require("../../util/mongoose");
const jwt = require("jsonwebtoken");

class SiteController {
   index(req, res) {
      res.render("home");
   }
   search(req, res) {
      res.send("<h1>Header</h1> <h2>Search page </h2>");
   }
   login(req, res, next) {
      res.render("login");
   }
   handleLogin(req, res, next) {
      function getCookie(cname) {
         let name = cname + "=";
         let decodedCookie = decodeURIComponent(document.cookie);
         let ca = decodedCookie.split(";");
         for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
               c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
               return c.substring(name.length, c.length);
            }
         }
         return "";
      }

      const username = req.body.username;
      const password = req.body.password;

      Account.findOne({ username: username, password: password })
         .then((data) => {
            function setCookie(cname, cvalue, exdays) {
               const d = new Date();
               d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
               let expires = "expires=" + d.toUTCString();
               document.cookie =
                  cname + "=" + cvalue + ";" + expires + ";path=/";
            }
            if (data) {
               jwt.sign({ id: data._id }, "mk", (err, token) => {
                  // setCookie("token", token, 1);
                  res.json({ status: "success", token: token});
               });
            } else {
               res.json("Đăng nhập thất bại");
            }
         })
         .catch((err) => {
            res.status(500).json(err);
         });
   }
}

module.exports = new SiteController();
