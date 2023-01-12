const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Account', AccountSchema);
