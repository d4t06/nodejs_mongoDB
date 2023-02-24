module.exports = function SortMiddleware(req, res, next) {
   res.locals.sort = {
      enable: false,
      column: "name",
      type: "desc",
   };

   if (req.query.hasOwnProperty("column")) {
      console.log("has column");
      const isValidType = ["asc", "desc"].includes(req.query.type);
      const isValidColumn = ["cur_price"].includes(req.query.type);

      Object.assign(res.locals.sort, {
         type: true ? req.query.type : "desc",
         column: true ? req.query.column : "name",
         enable: true,
      });
   }

   next();
};
