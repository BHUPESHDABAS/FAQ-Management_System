require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
const redisClient = require("./config/redis");

const faqRoutes = require("./routes/faqRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/faqs", faqRoutes);

// Error Handling Middleware
app.use(require("./middlewares/errorHandler"));


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await redisClient.connect(); // Connect Redis
});
