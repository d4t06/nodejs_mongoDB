const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, default: 'product_name' },
  image: { type: String },
  old_price: { type: String },
  cur_price: { type: String},
  // deletedAt: {type: Date, default: Date.now}
});

// add plugin
Product.plugin(mongooseDelete,  {deletedAt: true, overrideMethods: 'all'})

module.exports = mongoose.model('Product', Product)