let jwt = require("jsonwebtoken");

module.exports = {
   // kiểm tra đã login hay chưa
   isLogined: (req, res, next) => {
      if (req.session.isLogin) {
         // console.log({
         //    status: req.session.isLogin,
         // });
         const { displayName, photos } = req.session.isLogin;
         res.locals._isLogin = {
            status: true,
            displayName,
            photos,
         };
         // console.log(res.locals._isLogin);
         next();
      } else {
         res.redirect("/login");
         // try {
         //    const token = req.cookies.token;
         //    const result = jwt.verify(token, process.env.SESSION_SECRET);
         //    if (result) {
         //       req.session.isLogin = true;
         //       res.redirect("/products");
         //       next();
         //    } else {
         //       req.session.isLogin = false;
         //       res.redirect("/login");
         //    }
         // } catch (error) {
         //    res.redirect("/login");
         // }
      }
   },
   // kiểm tra để vào trang login, logout
   loginHandle: (req, res, next) => {
      // nếu đã login
      if (req.session.isLogin) {
         // console.log({
         //    status: req.session.isLogin,
         // });
         //  next();
         res.redirect("back");
      } else {
         // nếu chưa login
         next();
      }
   },
   logoutHandle: (req, res, next) => {
      // nếu đã login
      if (req.session.isLogin) {
         // console.log({
         //    status: req.session.isLogin,
         // });
         //  next();
         next();
      } else {
         // nếu chưa login
         res.redirect("back");
      }
   },
};
