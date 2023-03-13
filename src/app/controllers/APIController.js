// models
const Product = require("../models/Products");
const jwt = require("jsonwebtoken");
const Account = require("../models/Accounts");
const Detail = require("../models/Details");

class APIController {
   getProducts(req, res, next) {
      const { price, ...query } = req.query;

      // console.log(res.locals.sort)
      
      const [gThan, lThan] = price || [0, 50];
      
      console.log("controller pass ", {...query, price} );
      // console.log(gThan, lThan);

      // service
      Promise.all([
         Product.find({ ...query, cur_price: { $gte: gThan * 1000000, $lte: lThan * 1000000 } }).count(),
         Product.find({ ...query, cur_price: { $gte: gThan, $lte: lThan * 1000000 } })
            .handlePage(res)
            .handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json({ count, rows });
            return;
         })
         .catch((err) => res.json("loi server"));
   }
   async getOne(req, res, next) {
      // service
      const { key } = req.params;
      console.log(" key = ", key);

      // Promise.all([Product.findOne({href: key}), Detail.findOne({key: key})])
      // .then(([product, detail]) => {
      //    res.json([product])
      // })
      // return;
      let newProduct = [];

      const product = await Product.find({href: key})

      // res.json(product)
      // return

      product.forEach(async (product) => {
         try {            
            const detail = await Detail.findOne({key: key})

            product.set('data', detail.toJSON(), {strict: false})
            newProduct.push(product)

            res.json(newProduct)
         } catch (error) {

            res.status(500).json("loi server")
            console.log(error);
         }

      });  
   }

   search(req, res, next) {
      let { q, page } = req.query;
      if (!page) page = 1;
      console.log("search", q, page);

      Promise.all([
         Product.find({ name: new RegExp(q, "i") }).count(),
         Product.find({ name: new RegExp(q, "i") })
            .limit(page * 8)
            .handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json(rows.length ? { count, rows } : null);
         })
         .catch((err) => {
            res.status(500).json("lối serve");
            console.log(err);
         });
   }

   async login(req, res) {
      const {username, password} = req.body

      console.log(req.body);
      if (!username || !password) return res.status(400).json("missing payload")
   
         const account = await Account.findOne({username: username, password: password})

         const accessToken = jwt.sign({id: account._id }, process.env.SESSION_SECRET)

         res.json({role: account.role, accessToken: accessToken})


   }
   async register(req, res) {
      const {username, password} = req.body

      console.log(req.body);

         const account = await Account.findOne({username: username})

         if (account) return res.status(409).json("username taken")

         const newAccount = new Account({ username: username, password: password });

         const response = await newAccount.save()
         if (response) return res.status(200).json("dang ky thanh cong")
      
   }
   
}

module.exports = new APIController();
