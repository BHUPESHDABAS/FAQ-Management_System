const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/FAQ-Management');

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();
module.exports = mongoose;
