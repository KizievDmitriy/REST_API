const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST } = process.env;

const connectDB = async () => {
  return  mongoose.connect(DB_HOST)
  .then(()=>console.log("DataBase Conected"))
    .catch(error => {
      console.log(error.message);
      process.exit(1);
  })
}

module.exports = {
  connectDB,
}