require("dotenv").config(); 
const Redis = require("ioredis");


const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost", 
  port: process.env.REDIS_PORT || 6379,       
});

redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

module.exports = redisClient;
