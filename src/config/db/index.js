const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// const process = mongoose.connect('mongodb://localhost:80')

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hd_shop_dev')
    console.log("connected")
  } catch (error) {
    console.log("connect failure") 
  }
})()


