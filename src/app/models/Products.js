const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, default: 'product_name' },
  image: { type: String },
  old_price: { type: String },
  cur_price: { type: String},
});

module.exports = mongoose.model('Product', Product)