const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {type: Number},
  name: { type: String, default: 'product_name' },
  image: { type: String },
  old_price: { type: Number },
  cur_price: { type: Number},
  // deletedAt: {type: Date, default: Date.now}
},
  {
    _id: false,
    timestamps: true,
  }
);

//custom query helper
  // không được viết trùng tên với tên phương thức của query 
ProductSchema.query.handleSort = function (req, res) {
  // console.log(res.locals._sort)
  if (res.locals._sort.enable) {
    return this.sort({
      [res.locals._sort.column] : res.locals._sort.type
    })
  }
  return this;
}

// add plugin
ProductSchema.plugin(AutoIncrement)
ProductSchema.plugin(mongooseDelete,  {deletedAt: true, overrideMethods: 'all'})

module.exports = mongoose.model('Product', ProductSchema)