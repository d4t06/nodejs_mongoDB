const mongoose = require('mongoose');

async function connect () {
  try {
    await mongoose.connect('mongodb://localhost:27017/'+process.env.DB_NAME)
    console.log("connected")
  } catch (error) {
    console.log("connect failure") 
  }
}

module.exports = { connect }