const mongoose = require('mongoose');
require("dotenv").config();

// Connecting to the database
// connectDB();

const connectDB = async () => {
  try {
    const con=await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB;
