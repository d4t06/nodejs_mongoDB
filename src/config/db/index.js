const mongoose = require('mongoose');

async function connect () {
  try {
    await mongoose.connect('mongodb://localhost:27017/hd_shop_dev')
    // .then(() => console.log('Connected!'));
    console.log("connected")
  } catch (error) {
    console.log("connect failure")
    
  }
}

module.exports = { connect }