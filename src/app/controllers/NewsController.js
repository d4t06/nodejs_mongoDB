class NewsController {
  index(req, res) {
    res.send("<h1>Learn express js</h1> <h2>News page</h2>");
  }
  show(req, res) {
    res.send("<h1>Learn express js</h1> <h2>News page detail</h2>");
  }
}

module.exports = new NewsController();
