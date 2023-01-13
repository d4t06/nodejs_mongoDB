let jwt = require("jsonwebtoken");

module.exports = {
   isLoggedin: (req, res, next) => {
      if (req.session.isLoggedin) {
         console.log({
            status: req.session.isLoggedin,
         });
         next();
      } else {
         console.log({
            status: req.session.isLoggedin,
         });

         try {
            const token = req.cookies.token;
            const result = jwt.verify(token, process.env.SESSION_SECRET);
            if (result) {
               req.session.isLoggedin = true;
               res.redirect("/products");
               next();
            } else {
               req.session.isLoggedin = false;
               res.redirect("/login");
            }
         } catch (error) {
            res.redirect("/login");
         }
      }
   },
   isAuth: (req, res, next) => {
      if (req.session.isLoggedin) {
         console.log({
            status: req.session.isLoggedin,
         });
         //  next();
         res.redirect("back");
      } else {
         next();
      }
   },
};
