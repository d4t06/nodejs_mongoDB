module.exports = function paginationMiddleware (req, res, next) {
    res.locals._page = {
        curPage: 1,
        perPage: 2,
        totalPage: 5,
    };

    if (req.query.hasOwnProperty("_page")) {

        Object.assign(res.locals._sort, {
            curPage: parseInt(req.query.page) < 1 ? req.query.page : 1,
        })
    };

    next();
}