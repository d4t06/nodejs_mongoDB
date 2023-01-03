const pool = require("../../config/db");
class SiteController {
  index(req, res) {
    res.render("home");
  }
  search(req, res) {
    res.send("<h1>Header</h1> <h2>Search page </h2>");
  }
}

module.exports = new SiteController();
