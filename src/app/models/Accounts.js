const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String, default: "R3" },
});

module.exports = mongoose.model('Account', AccountSchema);
