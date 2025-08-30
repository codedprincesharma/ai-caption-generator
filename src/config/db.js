const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
  } catch (error) {
    console.log("error", error)
  }
}


module.exports = connectDb