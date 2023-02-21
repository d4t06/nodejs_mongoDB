module.exports = function paginationMiddleware (req, res, next) {
    res.locals.page = {
        curPage: 1,
        pageSize: 6,
    };

    if (req.query.hasOwnProperty("page")) {
        Object.assign(res.locals.page, {
            curPage: parseInt(req.query.page) > 1 ? 
                parseInt(req.query.page) : 
                1,
        })
    };

    next();
}