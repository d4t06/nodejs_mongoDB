module.exports = function SortMiddleware(req, res, next) {
   res.locals.sort = {
      enable: false,
      column: "",
      type: "",
   };

   if (req.query.column) {
      console.log("sort middleware pass");
      const isValidType = ["asc", "desc"].includes(req.query.type);
      const isValidColumn = ["cur_price", "intallment"].includes(req.query.column);

      Object.assign(res.locals.sort, {
         type: isValidType ? req.query.type : "desc",
         column: isValidColumn ? req.query.column : "name",
         enable: true,
      });

      const {column, type, ...rest} = req.query
      req.query = rest
   } else {
      Object.assign(res.locals.sort, {
         type: "",
         column: "",
         enable: false,
      });
   }

   next();
};
