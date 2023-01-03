const pool = require("../../config/db");

class ProductsController {
  index(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query("SELECT * from packages", (err, rows) => {
        connection.release();
        // neu khong co loi thi gui du lieu cho client
        if (!err) res.render("products", { rows });
        else console.log(err);
      });
    });
  }
  show(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query(
        "SELECT * from packages WHERE id = ?",
        [req.params.slug],
        (err, rows) => {
          connection.release();
          console.log(rows.name);
          // neu khong co loi thi gui du lieu cho client
          if (!err) res.render("products", { rows });
          else console.log(err);
        }
      );
    });
  }
  create(req, res) {
    res.render("create");
  }
  store(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      const params = req.body;
      connection.query("INSERT INTO packages SET ?", params, (err, rows) => {
        connection.release();
        // neu khong co loi thi gui du lieu cho client
        if (!err) res.redirect("/products");
        else console.log(err);
      });
    });
  }
  edit(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      connection.query(
        "SELECT * from packages WHERE id = ?",
        [req.params.slug],
        (err, rows) => {
          connection.release();
          // neu khong co loi thi gui du lieu cho client
          if (!err) res.render("edit", { rows });
          else console.log(err);
        }
      );
    });
  }
  update(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id" + connection.threadId);
      //query(sql string, callback)
      const { name, image, oldPrice, curPrice } = req.body;
      connection.query(
        "UPDATE packages SET name = ?, image = ?, oldPrice = ?, curPrice = ? WHERE id = ?",
        [name, image, oldPrice, curPrice, req.params.slug],
        (err, rows) => {
          connection.release();
          // neu khong co loi thi gui du lieu cho client
          if (!err) res.redirect("/products");
          else console.log(err);
        }
      );
    });
  }
  find(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const searchTerm = req.body.search;
      connection.query(
        "SELECT * from packages WHERE name LIKE ?",
        ["%" + searchTerm + "%"],
        (err, rows) => {
          connection.release();

          // neu khong co loi thi gui du lieu cho client
          if (!err) {
            // res.redirect("/products");
            // console.log(rows);
            res.render("products", { rows });
          } else console.log(err);
        }
      );
    });
  }
  delete(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      //query(sql string, callback)
      connection.query(
        "DELETE from packages WHERE id = ?",
        [req.params.slug],
        (err, rows) => {
          connection.release();

          // neu khong co loi thi gui du lieu cho client
          if (!err) res.redirect("/products");
          else console.log(err);
        }
      );
    });
  }
}

module.exports = new ProductsController();
