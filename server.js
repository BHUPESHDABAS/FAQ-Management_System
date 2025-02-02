require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db"); 
const redisClient = require("./config/redis");
const faqRoutes = require("./routes/faqRoutes"); 
const errorHandler = require("./middlewares/errorHandler"); 

const app = express();
const PORT = process.env.PORT || 4444;


app.use(cors());
app.use(express.json());

app.use("/api/faqs", faqRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    if (redisClient.status !== "ready") {
      await redisClient.connect(); // Connect to Redis only if not connected
      console.log("Connected to Redis");
    } else {
      console.log("Redis is already connected");
    }
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
});
