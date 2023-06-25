const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const mongoURL = 'mongodb+srv://abrar:3NUfKV42ivL3fxNm@cluster0.ekd31bu.mongodb.net/Practice?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL)
    console.log("Database is Connected")
  } catch (error) {
    console.log("ERROR", error)
  }
}

module.exports = connectDB;