const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config({path:".env"})

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'clientDB',
      connectTimeoutMS: 10000,
      socketTimeoutMS: 50000
    });
    console.log(
      "Database connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = connectDb;